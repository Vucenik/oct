  //***********************OBRADA ANGIO OCT  VV***************************************
    // VERZIJA 1.0.6. mod broj elemenata
    //AUTOR VLATKO VUČENIK 25.02.2024
 

    
import { napraviTablicuObrade2 ,napravi_slike} from "./prezentacija.js";
import {napraviRGB,dajProsjekRgb ,rafiniraj, prosjekRafinirani,napraviObjekt, daliJeImeDeepiliSuperficijal,frekvencijePromise, skini_obradu } from "./pomocne_funkcije.js";
import { obradaPodatakaSkupno } from "./statisticke_funkcije.js";
import { nacrtajGrafCanvas } from "./graf.js";
  
 
  ///*****funkcija  koja se rješava duplica u polju i vraća polje bez duplica
  const bezDuplica = function (bezDuplica = []) {
    bezDuplica = bezDuplica.map(x => JSON.stringify(x));
    bezDuplica = new Set(bezDuplica)
    bezDuplica = Array.from(bezDuplica)
    bezDuplica = bezDuplica.map(x => JSON.parse(x));
    return bezDuplica;
}





const obradaViseFilova = function (stanje) {
    let obradaf = {
        deep: [],
        superf: []
    }

    obradaf = stanje.reduce((ak, val) => {
        return Object.assign({}, {
            deep: [...ak.deep, ...val.deep],
            superf: [...ak.superf, ...val.superf]
        })

    }, {
        deep: [],
        superf: []
    })
    //console.log('obrada fajlova',obradaf)
    obradaf.deep = bezDuplica(obradaf.deep);
    obradaf.superf = bezDuplica(obradaf.superf);
    // console.log('obradaf',obradaf)
    // obradaf.deepObrada =napraviObradu( obradaf.deep);
    // obradaf.superfObrada = napraviObradu(obradaf.superf);
    let polje = obradaPodatakaSkupno(obradaf);

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

 ///////+++++++finkcija kombinira objekte  stanje i dodaj joj  novo svojstvo {ime:imefajla}

 const spojiImeNaObjekt = function (stanje, ob1) {

    return Object.assign(stanje, ob1);
}
const napraviObjektImeFajla = function (imeF) {
    return {
        ime: imeF.name
    }
}


    //*****************************POSTAVKE*******************************

    // Globalno dostupnpo Polje obrađenih slika za kasniju statističku analizu
    //Polje sadrži objekte tipa {naslov:x,prosjek:y,rgbprosjek:z,deep:true}
    let obrada = [];

    //********svi učitani fajlovi***** bez duplića
    let ukupno = [];


     const svifajlovi = document.getElementById('svi__fajlovi');
    svifajlovi.addEventListener('click', () => {
      //  klasaKlizaci2.style.display = "block";
        ukupno.push(obradaViseFilova(obrada))
        console.log(ukupno);
        updateStanje(1,kontejnerTablica,klasaKlizaci,ukupno[ukupno.length-1]);
   //     klasaKlizaci.style.display = "none";
        obrada.forEach(x => {
            // console.log('naslov',x.ime);
            kontejnerTablica.insertAdjacentHTML('afterBegin', ` <h3>Datoteka: ${x.ime}</h3>`);
        })
        //  console.log('stanje',stanje);


    }) 





  
   const kontejnerTablica = document.getElementById('kontejnertablica');;
   
 

  // pokazivač 
    const slider = document.getElementById('slider');
    const klasaKlizaci = document.querySelector(".klizac");
    const jsonFile = document.getElementById('jsonFile');

    const brojacSlider = document.getElementById("brojac__slider")
    slider.addEventListener("change",(brojacSlider=>e=>{
    
        brojacSlider.innerHTML = e.currentTarget.value;
        updateStanje(e.currentTarget.value,kontejnerTablica,klasaKlizaci,obrada[obrada.length-1]);
    })(brojacSlider));

   
    
    jsonFile.addEventListener('change', e => {
        console.log(e);
        let files = jsonFile.files[0];
        //console.log('ispravan format',ispravanFormat(files));
        let fileReader = new FileReader();
        // console.log('fil',files)
        fileReader.readAsText(files);
        // console.log(fileReader);

        fileReader.onload = () => {
            let ob = JSON.parse(fileReader.result);
            let rasponD = ob.deepObrada.raspon;
            let rasponF = ob.superfObrada.raspon;
            Promise.resolve(fileReader.result)
                .then(x => JSON.parse(x))
                .then(x => {
                     console.log('read',x);
                    let obIme = napraviObjektImeFajla(files);

                    obrada.push(spojiImeNaObjekt(x, obIme));

                })
                .then(() => {
                    console.log(obrada);
                    updateStanje(1,kontejnerTablica,klasaKlizaci,obrada[obrada.length-1]);
                  
                   // klasaKlizaci.style.display = 'block';
                 //   klasaKlizaci2.style.display = 'none';

                    //console.log('novo stanje',stanje);

                })

        };
    });


   
