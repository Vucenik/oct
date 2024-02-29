  //*********************** ANGIO OCT READER VV***************************************
    // VERZIJA 1.0.2. mod broj elemenata
    //AUTOR VLATKO VUČENIK 25.02.2024
 

    
import { napraviTablicuObrade2 ,imena_datoteke} from "./prezentacija.js";
import {napraviObjektImeFajla,spojiImeNaObjekt ,bezDuplica,frekvencijePromise } from "./pomocne_funkcije.js";
import { obradaPodatakaSkupno } from "./statisticke_funkcije.js";
import { nacrtajGrafCanvas } from "./graf.js";
  
 





const obradaViseFilova = function (stanje) {
    // const  obradaf = {
    //     deep: [],
    //     superf: []
    // }

   const obradaf = stanje.reduce((ak, val) => {
        return Object.assign({}, {
            deep: [...ak.deep, ...val.deep],
            superf: [...ak.superf, ...val.superf]
        })

    }, {
        deep: [],
        superf: []
    })
   
    obradaf.deep = bezDuplica(obradaf.deep);
    obradaf.superf = bezDuplica(obradaf.superf);
    const polje = obradaPodatakaSkupno(obradaf);

    return polje;

}



    




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




const updateStanje = function(y=1,kontejner,klizac,obrada){
    napraviTablicuObrade2(obrada,kontejner);
    dajDep(obrada,y,kontejner);
    dajSuperf(obrada,y,kontejner);
klizac.classList.add("pokazi_klizac");

}

 


    //*****************************POSTAVKE*******************************

    // Globalno dostupnpo Polje obrađenih slika za kasniju statističku analizu
    //Polje sadrži objekte tipa {naslov:x,prosjek:y,rgbprosjek:z,deep:true}
    let obrada = [];

    //********svi učitani fajlovi***** bez duplića
    let ukupno = [];
 let jedna_datoteka = true;

     const svifajlovi = document.getElementById('svi__fajlovi');
    svifajlovi.addEventListener('click', () => {
      //  klasaKlizaci2.style.display = "block";
        ukupno.push(obradaViseFilova(obrada))
        console.log(ukupno);
        jedna_datoteka=false;
        updateStanje(1,kontejnerTablica,klasaKlizaci,ukupno[ukupno.length-1]);
  
        kontejnerTablica.insertAdjacentHTML('afterbegin', imena_datoteke(obrada));
       

    }) 

 
   const kontejnerTablica = document.getElementById('kontejnertablica');;
     // pokazivač 
    const slider = document.getElementById('slider');
    const klasaKlizaci = document.querySelector(".klizac");
    const jsonFile = document.getElementById('jsonFile');

    const brojacSlider = document.getElementById("brojac__slider")
    slider.addEventListener("change",(brojacSlider=>e=>{
    
        brojacSlider.innerHTML = e.currentTarget.value;
        if(jedna_datoteka){
        updateStanje(e.currentTarget.value,kontejnerTablica,klasaKlizaci,obrada[obrada.length-1]);
        kontejnerTablica.insertAdjacentHTML('afterbegin', imena_datoteke([obrada[obrada.length-1]]));
    }else{
       
        updateStanje(e.currentTarget.value,kontejnerTablica,klasaKlizaci,ukupno[ukupno.length-1]);
        kontejnerTablica.insertAdjacentHTML('afterbegin', imena_datoteke(obrada));
    }

    })(brojacSlider));

      
    jsonFile.addEventListener('change', e => {
     
        let files = jsonFile.files[0];
   
       
   
        new Promise ((res,rej)=>{
            let fileReader = new FileReader();
     
            fileReader.readAsText(files);
            fileReader.onload = () =>  res(fileReader.result);
            fileReader.onerror=(err)=>rej(err);

        })
                .then(x => JSON.parse(x))
                .then(x => {
                    
                    let obIme = napraviObjektImeFajla(files);

                    obrada.push(spojiImeNaObjekt(x, obIme));

                })
                .then(() => {
                 jedna_datoteka=true;
                    updateStanje(1,kontejnerTablica,klasaKlizaci,obrada[obrada.length-1]);
                    kontejnerTablica.insertAdjacentHTML('afterbegin', imena_datoteke([obrada[obrada.length-1]]));
                  
                })

        
    });


   
