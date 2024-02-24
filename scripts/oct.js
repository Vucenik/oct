  //***********************OBRADA ANGIO OCT  ŽBČ***************************************
    // VERZIJA 1.0.5. mod broj elemenata
    //AUTOR VLATKO VUČENIK 17.12.2019
    //******Funkcije html elementi
    
import { napraviTablicuObrade2 } from "./prezentacija.js";
import {napraviRGB,dajProsjekRgb ,rafiniraj, prosjekRafinirani,napraviObjekt, daliJeImeDeepiliSuperficijal,frekvencijePromise } from "./pomocne_funkcije.js";
import { obradaPodataka} from "./statisticke_funkcije.js";
import { nacrtajGrafCanvas } from "./graf.js";
  
 
 

//
const dajDep = function (x=[],y=1,kontejner){

let mapx = x.deep.map((x)=>x.prosjek);
frekvencijePromise(mapx,y)
       .then(x=>{
      
        let graf = nacrtajGrafCanvas(x);
        kontejner.insertAdjacentHTML("beforeEnd","<h3>deep</h3>")
       
        kontejner.insertAdjacentElement('beforeEnd',graf);
      
        }
       )

};

const dajSuperf = function (x=[],y=1,kontejner){
let mapx= x.superf.map((x)=>x.prosjek);

       frekvencijePromise(mapx,y)
       .then(x=>{
        let graf = nacrtajGrafCanvas(x);
        kontejner.insertAdjacentHTML("beforeEnd","<h3>superficijal</h3>")
      
        kontejner.insertAdjacentElement('beforeEnd',graf);
     
        }
       )

}


const updateStanje = function(y=1,kontejner,klizac){
    napraviTablicuObrade2(obrada,kontejner);
    dajDep(obrada,y,kontejner);
    dajSuperf(obrada,y,kontejner);
klizac.style.display = "block";

}






    //*****************************POSTAVKE*******************************

    // Globalno dostupnpo Polje obrađenih slika za kasniju statističku analizu
    //Polje sadrži objekte tipa {naslov:x,prosjek:y,rgbprosjek:z,deep:true}
    let stanje = [];
    let obrada =[];
    //let fileName ;
// oserver za 
    const observer= new ResizeObserver(ulaz=>{
        ulaz.forEach(dl=>{
            const visina = dl.contentRect.height+'px';
            dl.target.parentElement.style.setProperty('--visina',visina);


        })
    });

    // id kontejner
   // const kontejner = document.getElementById('kontejner');
   const kontejnerTablica = document.getElementById('kontejnertablica')
    const spiner = document.getElementById('spiner');
    const linkObrada = document.getElementById('obrada');
    const detalji = document.getElementById('detalji_kontejner'); //novi
detalji.insertAdjacentHTML('afterbegin',"<ul><li>oznaka slike</li><li>udio žila i kapilara u %</li><li>RGB </li><li></li></ul>");

    linkObrada.addEventListener('click',function(){
        if(obrada.deep||obrada.superf){
      // console.log('obrad',obrada.deep.length,'super',obrada.superf);
        updateStanje(1,kontejnerTablica,klasaKlizaci);
      //klasaKlizaci.style.display = "block";
        }
    })

  // pokazivač 
    const slider = document.getElementById('slider');
    const klasaKlizaci = document.querySelector(".klizac");

   klasaKlizaci.style.display ="none";
    const brojacSlider = document.getElementById("brojac__slider")
    slider.addEventListener("change",e=>{
       // console.log("value",this.value);
        brojacSlider.innerHTML = e.currentTarget.value;
        updateStanje(e.currentTarget.value,kontejnerTablica,klasaKlizaci);
    })

    // id tablica
    
   //const tablica = document.getElementById('tablica');

    // id skini tablicu kao text dokument
    // down load datoteke kao json iz podataka obrada
   const link = document.getElementById('link');
   link.download = 'tablica.txt';


    link.addEventListener('click', e => {


        let txt;
        let datum = Date.now();
        let ime = prompt("Unesite ime datoteke", "Datoteka");
        if (ime == null || ime == "") {
            return;
        } else {
            txt = ime + " " + datum + " JSON.json";
            link.download = txt;
        }

        // e.preventDefault();

        let ob = {};
        // ob.stanje = stanje;
        ob = Object.assign({}, obrada);
        //  console.log('ob0', ob);
        // console.log('obrada', obrada);
        let obJson = JSON.stringify(ob);
        // console.log('objson', obJson);



        // let pr = tablica.innerText;

        let blob1 = new Blob([obJson], { type: 'text/plain' });
        link.href = URL.createObjectURL(blob1);
        URL.revokeObjectURL(link.herf);

    })


    // selektor inputa file
    const fileInput = document.getElementById('file');
  // fileInput.style.display = "none";

    // selekcija naslova za prikaz selektiranog elementa
    //const prikazDat = document.getElementById('prikazdat');
    fileInput.addEventListener('change', () => {
      // prikazDat.innerHTML = "";
    //    prikazDat.innerHTML = fileInput.files[0].name;
        gumb();
    })
    //  izaberi datoteku malo drukčije
   /* const izaberi = document.getElementById('izaberi');
    izaberi.addEventListener('click', e => {

        if (fileInput) {
            fileInput.click();
            // gumb();

        }
    }, false)

*/


    /////// read filet ////

    function gumb(ev) {

        let brojFajlova = fileInput.files.length - 1;
       
        //console.log ('broj filova ',brojFajlova);

        setTimeout(window.requestAnimationFrame(() => spiner.innerHTML = `${brojFajlova} 🐇`), 200);
        // selektira File input element

        // čita vrijednost url selektiranog file
        // console.log ('fileinput',fileInput.files);
        let borojFile = fileInput.files.length - 1;
        const napraviFunkciju = function () {
            if(brojFajlova===-1)return;
            //// for (let ii = 0; ii < fileInput.files.length; ii++) {


            let fileName = fileInput.files[brojFajlova].name;
            while (!daliJeImeDeepiliSuperficijal(fileName)){
                brojFajlova--;
                if(brojFajlova===-1){
                    setTimeout(() => spiner.innerHTML = `🐜 `, 5000);
                    return};
                fileName = fileInput.files[brojFajlova].name;

            }

            //let file = fileInput.files[ii];
            new Promise((res, odb) => {

                /////////////////////////////
                // kreira novi File reader objekt u koji ide podatak iz selektiranog file

                res(fileInput.files[brojFajlova]);
            })
                .then(file => {

                    let reader = new FileReader();
                    reader.readAsDataURL(file);

                    return reader;
                })
                .then(reader => {

                    // nakon što se učita fajl koji je selektiran ide se dalje

                    reader.onload = function () {

                        const img = document.createElement("img");
                        // kreira div element za podatke ispod slike
                   /*   const podaci = document.createElement("div");
                          // kreira potrebni redak i ćelije za kreiranje tablice sa podacima
                        const redak = document.createElement('tr');
                        const poljeN = document.createElement('td');
                        const poljeR = document.createElement('td');
                        const poljeP = document.createElement('td');*/

                        const ul =document.createElement('ul');
                        const div = document.createElement('div');
                        div.className="kontejner_dl";
                        const dl = document.createElement('div');
                     
                        const li1=document.createElement('li');
                        const li2=document.createElement('li');
                        const li3=document.createElement('li');
                        const li4=document.createElement('li');
                        const gumb= document.createElement('button');
                        gumb.className="gumb_pokazi";
                        gumb.addEventListener('click',e=>{
                            e.currentTarget.classList.toggle("gumb_dolje");
                            e.currentTarget.parentElement.parentElement.nextElementSibling.classList.toggle('pokazi_dl');
                
                        })
                        li4.appendChild(gumb);
                        const figure1 = document.createElement("figure");
                        const figure2 = document.createElement("figure");
                        const figcaption= document.createElement("figcaption");
                        const p1 = document.createElement("p");
                        const p2 = document.createElement("p");





                        // rezultat učitavanja slike pridružuje se img elementu
                        img.src = reader.result;
                        // kada se učita img element dalje se obražuje kao canvas element
                        img.onload = () => {

                            // window.requestAnimationFrame(()=>spiner.innerHTML=`${brojFajlova} 🐇`)

                            spiner.innerHTML = `${brojFajlova} 🐇`;
                            if (Number(brojFajlova) === 0 || (Number(brojFajlova)) === 1) {
                                setTimeout(() => spiner.innerHTML = `🐜 `, 5000)
                            }
                            borojFile--;
                            // original slika se meće na stranicu
                            kontejner.appendChild(img);
                            figure1.appendChild(img);
                            dl.appendChild(figure1);
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
                           // console.log('img',img);
                            ctx.drawImage(img, 0, 0);
                            //ctx1.drawImage(img,0,0);
                            //img.style.display = 'none';
                            // iz original img slike radi se ImageData objekt te mu se skida naslov sa podacima te se dalje obrađuje bez naslova
                          //  console.log('ctx',ctx,        0, 25, can.width, can.height - 25, 0, can.width, can.height - 25);
                            //const imgData = ctx.getImageData(0, 25, can.width, can.height - 25, 0, can.width, can.height - 25);
                            const imgData = ctx.getImageData(0, 25, can.width, can.height - 25, );
                           // const myImageData = ctx.getImageData(left, top, width, height);

                            // ovaj je sa naslovom ukljiučenim
                            // const imgData = ctx.getImageData(0,0,10,10);

                            // napravi se indexPolje formata [[rgba],[rgba].....]
                            const indexPolje = napraviRGB(imgData);

                            // raspodjel piksla 
                            //console.log( 'raspodjela',raspodjela(indexPolje));
                            //napravi prosjek RGB iz piksla
                            let RGBprosjek = dajProsjekRgb(indexPolje);

                            //napravi unit8 polje za obrnuti prikaz standardno isključeno
                            //const obrnuto = Uint8ClampedArray.from(obrniRGB(imgData));

                            // Novi image Data objekt sa inverznim prikazom boja isključen
                            //  const obData = new ImageData(obrnuto,can.width,can.height);
                            // Iz normalne slike radi vrveno zelenu
                            const crvenData = rafiniraj(indexPolje, RGBprosjek);
                            // const crvenData = rafiniraj(indexPolje,153);

                            let crvenDataF = crvenData.flat();
                            let crvenDataF8 = Uint8ClampedArray.from(crvenDataF);
                            const obData1 = new ImageData(crvenDataF8, can1.width, can1.height - 25);



                            // prosjećna boja na slici
                            let prosjek = (1 - prosjekRafinirani(indexPolje)) * 100;
                            // podaci u konzoli
                            // console.log('prosjek ', RGBprosjek)
                            //console.log('prosjek Rafinirani', prosjek);

                            prosjek = prosjek.toFixed(2);
                            let rGb = RGBprosjek;  // Math.ceil( dajProsjekRgb(indexPolje)[0],2);
                            // podaci ispod slike
                          /*  podaci.innerHTML = ` RGB Prosjek ${rGb}  <br> 
    relativni postotak žila na ukupnoj na slici ${ prosjek} %`;*/
                            p1.textContent="RGB prosjek = "+rGb ;
                            p2.textContent="Relativni postotak žila = "+prosjek+" %";
                            li3.textContent=rGb;
                            figcaption.appendChild(p1);
                            figcaption.appendChild(p2);
                            li1.textContent=fileName;
                            li2.textContent=prosjek+" %";
                            ul.appendChild(li1);
                            ul.appendChild(li2);
                            ul.appendChild(li3);
                            ul.appendChild(li4);
                            detalji.appendChild(ul);

/*
                            // podaci za tablicu
                            poljeN.innerText = fileName;
                            poljeP.textContent = prosjek;
                            poljeR.textContent = rGb;
                            redak.appendChild(poljeN);
                            // redak.appendChild(poljeR);
                            redak.appendChild(poljeP);
                           tablica.append(redak);
*/
                            // slika inverznih boja isključeno
                            //ctx.putImageData(obData,0,0);

                            // canvas element sa crveno zelenom slikom iz originala
                            ctx1.putImageData(obData1, 0, 0);
                            //inverzna slika dodana u kontejner Isključeno
                            // kontejner.appendChild(can);
                            /////NASLOV/////////
                            //kreira naslov slike iz podatka file.name i meće ga na vrh slike
                          //  let naslov = document.createElement('h4');
                           // naslov.innerHTML = fileName;

                           // kontejner.appendChild(naslov);

                            // dadana canvas slika crveno zelena u kontejner
                           // kontejner.appendChild(can1);
                            figure2.appendChild(can1);
                            figure2.appendChild(figcaption);
                            dl.appendChild(figure2);
                            div.appendChild(dl);
                            detalji.appendChild(div);
                            observer.observe(dl);

                            // dodana tablica u kontejner
                           // kontejner.appendChild(podaci);
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


                    }
                })
                .catch(e=>console.log(e))


        }
        /// pozcziva funkcij
        napraviFunkciju();
       
    }
