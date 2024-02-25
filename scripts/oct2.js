  //***********************OBRADA ANGIO OCT  VV***************************************
    // VERZIJA 1.0.6. mod broj elemenata
    //AUTOR VLATKO VUČENIK 25.02.2024
 

    
import { napraviTablicuObrade2 ,napravi_slike} from "./prezentacija.js";
import {napraviRGB,dajProsjekRgb ,rafiniraj, prosjekRafinirani,napraviObjekt, daliJeImeDeepiliSuperficijal,frekvencijePromise, skini_obradu } from "./pomocne_funkcije.js";
import { obradaPodataka} from "./statisticke_funkcije.js";
import { nacrtajGrafCanvas } from "./graf.js";
  
 
 


const dajDep = function (x=[],y=1,kontejner){

let mapx = x.deep.map((x)=>x.prosjek);
frekvencijePromise(mapx,y)
       .then(x=>{
      
        let graf = nacrtajGrafCanvas(x,"DEEP");
           
        kontejner.insertAdjacentElement('beforeEnd',graf);
      
        }
       )

};

const dajSuperf = function (x=[],y=1,kontejner){
let mapx= x.superf.map((x)=>x.prosjek);

       frekvencijePromise(mapx,y)
       .then(x=>{
        let graf = nacrtajGrafCanvas(x,"SUPERFICIAL");
           
        kontejner.insertAdjacentElement('beforeEnd',graf);
     
        }
       )

}


const updateStanje = function(y=1,kontejner,klizac){
    napraviTablicuObrade2(obrada,kontejner);
    dajDep(obrada,y,kontejner);
    dajSuperf(obrada,y,kontejner);
klizac.classList.add("pokazi_klizac");

}






    //*****************************POSTAVKE*******************************

    // Globalno dostupnpo Polje obrađenih slika za kasniju statističku analizu
    //Polje sadrži objekte tipa {naslov:x,prosjek:y,rgbprosjek:z,deep:true}
    let stanje = [];
    let obrada =[];
   
// oserver za 
    const observer= new ResizeObserver(ulaz=>{
        ulaz.forEach(dl=>{
            const visina = dl.contentRect.height+'px';
            dl.target.parentElement.style.setProperty('--visina',visina);


        })
    });

  
   const kontejnerTablica = document.getElementById('kontejnertablica')
    const spiner = document.getElementById('spiner');
    const linkObrada = document.getElementById('obrada');
    const detalji = document.getElementById('detalji_kontejner'); //novi
detalji.insertAdjacentHTML('afterbegin',"<ul><li>oznaka slike</li><li>udio žila i kapilara u %</li><li>RGB </li><li></li></ul>");

    linkObrada.addEventListener('click',function(){
        if(obrada.deep||obrada.superf){
     
        updateStanje(1,kontejnerTablica,klasaKlizaci);
    
        }
    })

  // pokazivač 
    const slider = document.getElementById('slider');
    const klasaKlizaci = document.querySelector(".klizac");


    const brojacSlider = document.getElementById("brojac__slider")
    slider.addEventListener("change",(brojacSlider=>e=>{
    
        brojacSlider.innerHTML = e.currentTarget.value;
        updateStanje(e.currentTarget.value,kontejnerTablica,klasaKlizaci);
    })(brojacSlider));

   
    // down load datoteke kao json iz podataka obrada
   const link = document.getElementById('link');
   link.download = 'tablica.txt';


    link.addEventListener('click',skini_obradu(obrada) )

    // selektor inputa file
    const fileInput = document.getElementById('file');
  

    // selekcija naslova za prikaz selektiranog elementa
   
    fileInput.addEventListener('change', gumb(fileInput,spiner)
        
    );
   


    /////// read filet ////

    function gumb(fileInput,spiner){     
    return function (){

        let brojFajlova = fileInput.files.length - 1;
       
        setTimeout(window.requestAnimationFrame(() => spiner.innerHTML = `${brojFajlova} 🐇`), 200);
        // selektira File input element

        // čita vrijednost url selektiranog file i rekurzivno poziva samu sebe
           const napraviFunkciju = function () {
            if(brojFajlova===-1)return;
          
            let fileName = fileInput.files[brojFajlova].name;

            while (!daliJeImeDeepiliSuperficijal(fileName)){
                brojFajlova--;
                if(brojFajlova===-1){
                    setTimeout(() => spiner.innerHTML = `🐜 `, 5000);
                    return};
                fileName = fileInput.files[brojFajlova].name;

            }

// kreira novi File reader objekt u koji ide podatak iz selektiranog file
            Promise.resolve(fileInput.files[brojFajlova])
                .then(file => {
                   return new Promise((resolve,reject)=>{
                    let reader = new FileReader();
                    reader.readAsDataURL(file);

                  //  return reader;
                   reader.onload=()=>resolve(reader);
                   reader.onerror=(err)=>reject(err);
                                     

                
                })
                   }
                )
            
                .then(reader => {


                        const img = document.createElement("img");
                     
                        // rezultat učitavanja slike pridružuje se img elementu
                      
                        img.src = reader.result;
                        // kada se učita img element dalje se obražuje kao canvas element
                        img.onload = () => {

                            spiner.innerHTML = `${brojFajlova} 🐇`;
                            if (Number(brojFajlova) === 0 || (Number(brojFajlova)) === 1) {
                                setTimeout(() => spiner.innerHTML = `🐜 `, 5000)
                            }
                           
                            // original slika se meće na stranicu


                            //kreiraju se dva canvas elementa  jedan sa crveno zelenim slikama a jedan sa obrnutim koji nije aktiviran

                            let can = document.createElement('canvas');
                            let can1 = document.createElement('canvas');
                            //    can.width = img.width;
                            //    can.height = can.height;
                            const ctx = can.getContext('2d');
                            const ctx1 = can1.getContext('2d');


                            can.width = img.width;
                            can.height = img.height;
                            can1.width = img.width;
                            can1.height = img.height;
                         
                            ctx.drawImage(img, 0, 0);
                           
                            const imgData = ctx.getImageData(0, 25, can.width, can.height - 25, );
                          
                            const indexPolje = napraviRGB(imgData);

                            // raspodjel piksla 
                            
                            //napravi prosjek RGB iz piksla
                            let RGBprosjek = dajProsjekRgb(indexPolje);

                          
                            // Iz normalne slike radi vrveno zelenu
                            const crvenData = rafiniraj(indexPolje, RGBprosjek);
                         
                            let crvenDataF = crvenData.flat();
                            let crvenDataF8 = Uint8ClampedArray.from(crvenDataF);
                            const obData1 = new ImageData(crvenDataF8, can1.width, can1.height - 25);



                            // prosjećna boja na slici
                            let prosjek = (1 - prosjekRafinirani(indexPolje)) * 100;
                           
                            prosjek = prosjek.toFixed(2);
                            let rGb = RGBprosjek;  // Math.ceil( dajProsjekRgb(indexPolje)[0],2);
                            // podaci ispod slike
                         
                          
                            // slika inverznih boja isključeno
                            //ctx.putImageData(obData,0,0);

                            // canvas element sa crveno zelenom slikom iz originala
                            ctx1.putImageData(obData1, 0, 0);
                          
                           
                            const podaci={img,rGb,prosjek,fileName,can1,observer};
                            /// slike na stranicu
                            napravi_slike(detalji,podaci);

                          
                            ////***********OBNOVA STANJA****************************************
                            stanje.push(napraviObjekt(fileName, prosjek, rGb))
                            // ********OBNOVA OBRADE**********************
                            obrada = Object.assign(obrada, obradaPodataka(stanje));

                            ////// rekurzivno poziva funkcijei nakon sto je img gotov
                            if (img.complete) {

                                if (brojFajlova > -1) {
                                    brojFajlova--;
                                    napraviFunkciju();
                                    
                                }

                            }

                        }


                    
                })
                .catch(e=>console.log(e))


        }
        /// pozcziva funkcij
        napraviFunkciju();
       
    }
}
