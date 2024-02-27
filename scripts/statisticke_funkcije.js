
    // statističke funkcije uzimaju polje podataka i računaju

    //let polje = [30,1,12,8,1,7,24,4,4,6,20,10,3,2,22,23,8,6,5,25,16,3,1,14,15,18,2,6,27,19,12,4,20,14,3,13,8,15,30,5,7,16];



    export const arimetickaSredina = function (po = []) {
        const zbroj = po.reduce((ak, val) => {
            return ak + Number(val);

        }, 0)
        const N = po.length || 1;
        return (zbroj / N).toFixed(2)
    };
   



   export  const medijan = function (po = []) {
        const po1 = [...po];
        po1.sort((a, b) => a - b);
        
        if (po1.length) {
            const N = po1.length;
            
            const sredina = Math.floor(N / 2);
      

            if (N % 2 === 0) {
                const a = Number(po1[(sredina - 1)]);
                const b = Number(po1[sredina]);
                const r = (a + b) / 2;

                return r.toFixed(2);
            } else {

                return Number(po1[sredina]).toFixed(2);
            }


        }
    };

   export  const prosAbOdstOdAritSred = function (po = [],arit ) {
 
        const odstupanje = po.reduce((ak, val) => {
           
            return ak + Math.abs(Number(val) - arit);
        }, 0)
        return (odstupanje / po.length).toFixed(2);

    };

    export const varijanca = function (po = [], aritSredina = arimetickaSredina(po)) {
        const  odstupanjeKvadratno = po.reduce((ak, val) => {
            return ak + Math.pow((Number(val) - aritSredina), 2);

        }, 0)
        return (odstupanjeKvadratno / po.length).toFixed(4);

    };


    export const stanDevijacija = function (po = []) {
        return (Math.sqrt(varijanca(po))).toFixed(4);
    };

    export const dajBrojelemenata = function(po=[]){
        return po.length;
    };

   export const relativnoStandardnoOdstupanje = function (po = []) {
        const x = arimetickaSredina(po);
        const s = stanDevijacija(po);


        const rsd = (s / x) * 100;
        if (isNaN(rsd)) return 0;
        return rsd.toFixed(2);
    };


    ///*******funkcija statističke obrade unos polje vrijednosti izlaz objekt sa vrijednostima

   export  const napraviObradu = function (deepPolje = [], x = deepPolje[0]) {
        let deepBezPrvog = deepPolje.slice(1, deepPolje.length);
        if (deepPolje.length <= 1) {
            deepBezPrvog = [0];
        };
        const aritmetičkaSredina =arimetickaSredina(deepPolje);
            const odstupanjeOdSredine = prosAbOdstOdAritSred(deepPolje, aritmetičkaSredina);
      const   varijanca_izracun= varijanca(deepPolje, aritmetičkaSredina);

        return {
            brojElemenata:dajBrojelemenata(deepPolje),
            aritmetičkaSredina,
            medijan: medijan(deepPolje),
            raspon: [deepPolje[0], deepPolje[deepPolje.length - 1]],
           odstupanjeOdSredine,
            varijanca:varijanca_izracun,
            standardnaDevijacija: stanDevijacija(deepPolje),
            najmanji: x,
            rsd: relativnoStandardnoOdstupanje(deepPolje),
            standarDevBezNajmanjeg: stanDevijacija(deepBezPrvog)


        };
    }




    //funkcija obrada podataka ulazni parametar je polje stanje
    export const obradaPodataka = function (sta = []) {

        const deep = sta.filter(x => x.deep).sort((a, b) => a.prosjek - b.prosjek);
        const superf = sta.filter((x => x.superf)).sort((a, b) => a.prosjek - b.prosjek);

        const deepPolje = deep.length > 0 ? deep.map(x => x.prosjek) : [0];
        const superPolje = superf.length > 0 ? superf.map(x => x.prosjek) : [0];

        const deepObrada = napraviObradu(deepPolje, deep[0]);
        const superfObrada = napraviObradu(superPolje, superf[0]);



        return {
            deep,
            superf,
            deepObrada,
            superfObrada
        }

    }


    //funkcija obrada podataka ulazni parametar je polje stanje za reader
  export  const obradaPodatakaSkupno = function (sta = {}) {

        let deep = sta.deep.sort((a, b) => a.prosjek - b.prosjek);
        let superf = sta.superf.sort((a, b) => a.prosjek - b.prosjek);

        let deepPolje = deep.length > 0 ? deep.map(x => x.prosjek) : [0];
        let superPolje = superf.length > 0 ? superf.map(x => x.prosjek) : [0];

        let deepObrada = napraviObradu(deepPolje, deep[0]);
        let superfObrada = napraviObradu(superPolje, superf[0]);



        return {
            deep,
            superf,
            deepObrada,
            superfObrada
        }

    }
