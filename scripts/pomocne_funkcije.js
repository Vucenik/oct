
//*********************FUNKCIJE**********************************
// Funkcija uzima jednodimenzinalno polje pixla u unit8 clamp formatu jedan pixel je određen sa četiri elemenata polja RGBA
export const napraviRGB = (x = []) => {
    const polje = [];

    let duzina = x.data.length;
    // broj sve piksel i četri meće u polje tako da je svaki piks u polju sa četri elementa broje krajnieg polja je broj piksla

    for (let i = 0; i < x.data.length; i = i + 4) {
        const rgb = [];
        //console.log(x.data[i]);
        rgb.push(x.data[i]);
        rgb.push(x.data[i + 1]);
        rgb.push(x.data[i + 2]);
        rgb.push(x.data[i + 3]);
        polje.push(rgb);
    }
    // polje u formatu [[rgba],[rgba].....]
    return polje;
};

 /// funkcija načina prosječnu vrijednost svih piksii u određenom kanalu npr R +R +R .../broj piksla te frača s obzirom da je crno bijela slika samo jednu prosječnu vriijednos sive boje
 export const dajProsjekRgb = function (x = []) {
    // console.log('x',x);
    let uk = x.reduce((ak, val) => {
        //  console.log('akaaaa',ak);
        ak[0] = ak[0] + val[0];
        ak[1] = ak[1] + val[1];
        ak[2] = ak[2] + val[2];
        ak[3] = ak[3] + val[3];
        return ak;

    }
        , [0, 0, 0, 0]);

    const prosjek_po_kanalima = uk.map(y => y / x.length);
   

    const prosjek_prvog_kanala = Math.ceil(prosjek_po_kanalima[0]);
    return prosjek_prvog_kanala;
};

 // funkcija uzima polje oblika [[rgba],[rgba].....] te za određeni raspon pikslu u tom rasponu mjenja boju u r g ili u bjelu
    // sve crne i sive manje od prosjeka pretvara u bjele od prosjeka do 150 u zelene a ostale koji su veći od 150 u crvene
    export const rafiniraj = function (po = [], pro = 110) {
        // console.log('polj',po);

        const rez = po.reduce((ak, val) => {
            if (val[0] < pro || val[1] < pro || val[2] < pro) {
                ak.push([255, 255, 255, 255])

            } else if (val[0] > 153 || val[1] > 153 || val[2] > 153) {
                ak.push([255, 0, 0, 255])
            } else if ((val[0] < 153 && val[0] > pro) || (val[1] < 153 && val[1] > pro) || (val[2] < 153 && val[2] > pro)) {
                ak.push([0, 255, 0, 255])
            }
            else {
                //ak.push(val);
                ak.push([255, 255, 255, 255])
            }

            return ak;

        }, [])
        //console.log('rez',rez);
        return rez;


    }


    /// funkcija uzima dva parametra polje u obliku [[rgba],[rgba].....]  računa broj piksi koji su tamniji od prosjeka sive kroz ukupan broj piksli znači kolik je udio tamnijih piksi od prosjeka na slici
    export const prosjekRafinirani = function (po = [], pro = 110) {
        const poRaf = po.filter(val => (val[0] < pro || val[1] < pro || val[2] < pro));
        return poRaf.length / po.length;

    };



// funkcija za pravljenje objkata pridruženih  globalno polju stanje
    //Polje sadrži objekte tipa {naslov:x,prosjek:y,rgbprosjek:z,deep:true,superf:false}



    export const napraviObjekt = function (x = '', y = 0, z = 0) {
        const naslov = x;
        const deep = /deep/ig.test(naslov);
        const superf = /superficial/ig.test(naslov);
        // console.log('deep', deep);
        // console.log('superficijal', superf);
        return {
            naslov: x,
            prosjek: y,
            rgbprosjek: z,
            deep: deep,
            superf: superf

        }
    };


   export  const daliJeImeDeepiliSuperficijal = function(naslov){

        let deep = /deep/ig.test(naslov);
        let superf = /superficial/ig.test(naslov);
        return deep||superf;

    };

    //
    export const frekvencijePromise = function(polje=[],korak=1){

        return new Promise((res,odb)=>{
        let po = [...polje];
        po.sort((a, b) => a - b)
        //console.log(po);
        
        let frekPolje = [];
        let nutarnjePolje = [];
        let prvi = Number(po[0]);
        
        for (let i = 0; i < po.length; i++) {
        
            if ((Number(po[i]) - prvi) < korak) {
                nutarnjePolje.push(po[i]);
                if (i === (po.length - 1)) {
                    frekPolje.push(nutarnjePolje);
                }
        
            } else {
        
                frekPolje.push(nutarnjePolje);
                nutarnjePolje = [];
                prvi = Number(po[i]);
                nutarnjePolje.push(po[i]);
        
                if (i === (po.length - 1)) {
                    frekPolje.push(nutarnjePolje);
        
                }
            }
        }
        res(frekPolje);
        odb('Greška u obradi frekvencija')
        
        })
        }


        ///skidanje tablice obrade u json formatu
        export const skini_obradu=obrada=>e => {


            let txt;
            const datum = Date.now();
            let ime = prompt("Unesite ime datoteke", "Datoteka");
            if (ime == null || ime == "") {
                return;
            } else {
                txt = ime + " " + datum + " JSON.json";
                link.download = txt;
            }
    
             
            const ob = Object.assign({}, obrada);
           
              
            const obJson = JSON.stringify(ob);
               
            const blob1 = new Blob([obJson], { type: 'text/plain' });
            link.href = URL.createObjectURL(blob1);
            URL.revokeObjectURL(link.herf);
    
        };
    
        
 ///*****funkcija  koja se rješava duplica u polju i vraća polje bez duplica
 export const bezDuplica = function (bezDuplica = []) {
    bezDuplica = bezDuplica.map(x => JSON.stringify(x));
    bezDuplica = new Set(bezDuplica)
    bezDuplica = Array.from(bezDuplica)
    bezDuplica = bezDuplica.map(x => JSON.parse(x));
    return bezDuplica;
}

///////+++++++finkcija kombinira objekte  stanje i dodaj joj  novo svojstvo {ime:imefajla}

export const spojiImeNaObjekt = function (stanje, ob1) {

    return Object.assign(stanje, ob1);
}
export const napraviObjektImeFajla = function (imeF) {
    return {
        ime: imeF.name
    }
}
