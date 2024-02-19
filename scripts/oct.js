  //***********************OBRADA ANGIO OCT  ŽBČ***************************************
    // VERZIJA 1.0.5. mod broj elemenata
    //AUTOR VLATKO VUČENIK 17.12.2019
    //******Funkcije html elementi
    const napraviTablicu = function (po = [], id) {

        let tablica = document.createElement('table');
        tablica.setAttribute('class', 'tablica');
        // tablica.setAttribute('id',id);
        let tr = document.createElement('tr');

        let th = document.createElement('th');
        let th1 = document.createElement('th');
        th.textContent = 'Slika naslov';
        tr.appendChild(th);
        th1.textContent = 'udio žila i kapilara u%';
        tr.appendChild(th1);
        tablica.appendChild(tr);

        po.forEach(x => {
            let trp = document.createElement('tr');
            let td = document.createElement('td');
            let td1 = document.createElement('td');
            td.innerText = x.naslov;
            trp.appendChild(td);
            td1.innerText = x.prosjek;
            trp.appendChild(td1);
            tablica.appendChild(trp);

        })

        return tablica;



    }


    const napraviTablicuObrade = function () {
        kontejnerTablica.style.display = 'block';
        while (kontejnerTablica.firstChild) {
            kontejnerTablica.removeChild(kontejnerTablica.firstChild);
        }
        //console.log('obrada',obrada);
        let odstupanjeOdSredineDeep = obrada.deepObrada.odstupanjeOdSredine;
        let aritmetičkaSredinaDeep = obrada.deepObrada.aritmetičkaSredina;
        let medijanDeep = obrada.deepObrada.medijan;
        let raspon1Deep = obrada.deepObrada.raspon[0];
        let raspon2Deep = obrada.deepObrada.raspon[1];
        let varijancaDeep = obrada.deepObrada.varijanca;
        let devijacijaDeep = obrada.deepObrada.standardnaDevijacija;
        let rsdDeep = obrada.deepObrada.rsd;
        let najmanjielemDeep = obrada.deepObrada.najmanji.naslov;
        if (najmanjielemDeep === undefined) najmanjielemDeep = " - ";
        let devijacijaBezNajmanjeg = obrada.deepObrada.najmanji.naslov;
        let standarDevBezNajmanjegD = obrada.deepObrada.standarDevBezNajmanjeg;
        let rsdDepB = ((Number(standarDevBezNajmanjegD) / Number(aritmetičkaSredinaDeep)) * 100).toFixed(2);
        if (isNaN(rsdDepB)) rsdDepB = 0;


        let aritmetičkaSredinaF = obrada.superfObrada.aritmetičkaSredina;
        let medinaF = obrada.superfObrada.medijan;
        let raspon1F = obrada.superfObrada.raspon[0];
        let raspon2F = obrada.superfObrada.raspon[1];
        let odstupanjeOdSredineF = obrada.superfObrada.odstupanjeOdSredine;
        let varijancaF = obrada.superfObrada.varijanca;
        let rsdF = obrada.superfObrada.rsd;
        let najmanjielemF = obrada.superfObrada.najmanji.naslov;

        if (najmanjielemF === undefined) najmanjielemF = " - ";

        let standarDevBezNajmanjegF = obrada.superfObrada.standarDevBezNajmanjeg;
        let rsdFB = ((Number(standarDevBezNajmanjegF) / Number(aritmetičkaSredinaF)) * 100).toFixed(2);
        if (isNaN(rsdFB)) rsdFB = 0;
        // if(obrada.superfObrada.varijanca==!NaN){
        //     varijancaF = obrada.superfObrada.varijanca;
        // }
        //(obrada.superfObrada.varijanca===NaN)?"":obrada.superfObrada.varijanca;
        let devijacijaF = obrada.superfObrada.standardnaDevijacija ? obrada.superfObrada.standardnaDevijacija : "";

        //console.log('var',obrada.superfObrada.varijanca )

        let obradaDeep = `<h4> Aritmetička sredina ${aritmetičkaSredinaDeep} </h4>
<h4> Medijan ${medijanDeep} </h4>
<h4> Raspon ${raspon1Deep} - ${raspon2Deep} </h4>
<h4> Prosječno odstupanje od aritmetičke sredine ${odstupanjeOdSredineDeep} </h4>
<h4> Varijanca ${varijancaDeep} </h4>
<h4> Standardna devijacija ${devijacijaDeep} </h4>
<h4> Relativna standardna devijacija ${rsdDeep} </h4>
<h4> Najmanja gustoća žila ${najmanjielemDeep} </h4>
<h4> Standardna devijacija bez najmanjeg elementa ${standarDevBezNajmanjegD}  RSD ${rsdDepB} </h4>
`
        let obradaSuper = `<h4> Aritmetička sredina ${aritmetičkaSredinaF} </h4>
<h4> Medijan ${medinaF} </h4>
<h4> Raspon ${raspon1F} - ${obrada.superfObrada.raspon[1]} </h4>
<h4> Prosječno odstupanje od aritmetičke sredine ${odstupanjeOdSredineF} </h4>
<h4> Varijanca ${varijancaF} </h4>
<h4> Standardna devijacija ${devijacijaF} </h4>
<h4> Relativna standardna devijacija ${rsdF} </h4>
<h4> Najmanja gustoća žila ${najmanjielemF} </h4>
<h4> Standardna devijacija bez najmanjeg elementa ${standarDevBezNajmanjegF}  RSD ${rsdFB} </h4>
`
        kontejnerTablica.insertAdjacentHTML('afterBegin', ' <h2>Obrada DEEP</h2>');
        kontejnerTablica.appendChild(napraviTablicu(obrada.deep, 'pr'));
        kontejnerTablica.insertAdjacentHTML('beforeEnd', obradaDeep);
        kontejnerTablica.insertAdjacentHTML('beforeEnd', ' <h2>Obrada superficijal</h2>');
        kontejnerTablica.appendChild(napraviTablicu(obrada.superf, 'pr'));
        kontejnerTablica.insertAdjacentHTML('beforeEnd', obradaSuper);


    }



    // vewrzija 2

    const napraviTablicuObrade2 = function(obrada={}){
        //console.log('tablica obrade',obrada);
    
    //console.log('kon',kontejnerTablica);


   
    kontejnerTablica.style.display = 'block';
while (kontejnerTablica.firstChild) {
    kontejnerTablica.removeChild(kontejnerTablica.firstChild);
}
//console.log('obrada',obrada);
let odstupanjeOdSredineDeep = obrada.deepObrada.odstupanjeOdSredine;
let aritmetičkaSredinaDeep = obrada.deepObrada.aritmetičkaSredina;
let medijanDeep = obrada.deepObrada.medijan;
let raspon1Deep = obrada.deepObrada.raspon[0];
let raspon2Deep = obrada.deepObrada.raspon[1];
let varijancaDeep = obrada.deepObrada.varijanca;
let devijacijaDeep = obrada.deepObrada.standardnaDevijacija;
let rsdDeep = obrada.deepObrada.rsd;
let brojEelemenataDeep = obrada.deepObrada.brojElemenata;


let aritmetičkaSredinaF = obrada.superfObrada.aritmetičkaSredina;
let medinaF = obrada.superfObrada.medijan;
let raspon1F = obrada.superfObrada.raspon[0];
let raspon2F = obrada.superfObrada.raspon[1];
let odstupanjeOdSredineF = obrada.superfObrada.odstupanjeOdSredine;
let varijancaF =obrada.superfObrada.varijanca ;
let rsdF = obrada.superfObrada.rsd;
let brojEelemenataF = obrada.deepObrada.brojElemenata;
// if(obrada.superfObrada.varijanca==!NaN){
//     varijancaF = obrada.superfObrada.varijanca;
// }
//(obrada.superfObrada.varijanca===NaN)?"":obrada.superfObrada.varijanca;
let devijacijaF = obrada.superfObrada.standardnaDevijacija?obrada.superfObrada.standardnaDevijacija:"";

//console.log('var',obrada.superfObrada.varijanca )

let obradaDeep = `
<h4> Broj elemenata N=  ${brojEelemenataDeep} </h4>
<h4> Aritmetička sredina ${aritmetičkaSredinaDeep} </h4>
<h4> Medijan ${medijanDeep} </h4>
<h4> Raspon ${raspon1Deep} - ${raspon2Deep} </h4>
<h4> Prosječno odstupanje od aritmetičke sredine ${odstupanjeOdSredineDeep} </h4>
<h4> Varijanca ${varijancaDeep} </h4>
<h4> Standardna devijacija ${devijacijaDeep} </h4>
<h4> Relativna standardna devijacija ${rsdDeep} </h4>
`
let obradaSuper = `
<h4> Broj elemenata N=  ${brojEelemenataF} </h4>
<h4> Aritmetička sredina ${aritmetičkaSredinaF} </h4>
<h4> Medijan ${medinaF} </h4>
<h4> Raspon ${raspon1F} - ${obrada.superfObrada.raspon[1]} </h4>
<h4> Prosječno odstupanje od aritmetičke sredine ${odstupanjeOdSredineF} </h4>
<h4> Varijanca ${varijancaF } </h4>
<h4> Standardna devijacija ${devijacijaF} </h4>
<h4> Relativna standardna devijacija ${rsdF} </h4>
`
kontejnerTablica.insertAdjacentHTML('afterBegin', ' <h2>Obrada DEEP</h2>');
kontejnerTablica.appendChild(napraviTablicu(obrada.deep, 'pr'));
kontejnerTablica.insertAdjacentHTML('beforeEnd', obradaDeep);
kontejnerTablica.insertAdjacentHTML('beforeEnd', ' <h2>Obrada superficijal</h2>');
kontejnerTablica.appendChild(napraviTablicu(obrada.superf, 'pr'));
kontejnerTablica.insertAdjacentHTML('beforeEnd', obradaSuper);


}


    //*********************FUNKCIJE**********************************

    // Funkcija uzima jednodimenzinalno polje pixla u unit8 clamp formatu jedan pixel je određen sa četiri elemenata polja RGBA
    const napraviRGB = (x = []) => {
        let polje = [];

        let duzina = x.data.length;
        // broj sve piksel i četri meće u polje tako da je svaki piks u polju sa četri elementa broje krajnieg polja je broj piksla

        for (let i = 0; i < x.data.length; i = i + 4) {
            let rgb = [];
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


    /// funkcija za računanje rspodjele skupova u rasponu od 51 znači pet skupava koliko ima piksal u rasponu od 0-51 51-102 102-153 153-204 204-255 ulaz u formatu [[rgba],[rgba].....]

    const raspodjela = function (x = []) {
        // console.log('x',x);
        let racuna = x.reduce((ak, val) => {
            if (val[0] < 51 || val[1] < 51 || val[2] < 51) {
                ak[0] = ak[0] + 1
            };

            if ((val[0] < 102 && val[0] > 51) || (val[1] < 102 && val[1] > 51) || (val[2] < 102 && val[2] > 51)) {
                ak[1] = ak[1] + 1;
            }
            if ((val[0] < 153 && val[0] > 102) || (val[1] < 153 && val[1] > 102) || (val[2] < 153 && val[2] > 102)) {
                ak[2] = ak[2] + 1;
            };
            if ((val[0] < 204 && val[0] > 153) || (val[1] < 204 && val[1] > 153) || (val[2] < 204 && val[2] > 153)) {
                ak[3] = ak[3] + 1;
            };
            if ((val[0] > 204) || (val[1] > 204) || (val[2] > 204)) {
                ak[4] = ak[4] + 1;
            };

            return ak;

        }, [0, 0, 0, 0, 0])
        //console.log('racuna', racuna);
        racuna = racuna.map(y => {
            return ((y / x.length) * 100).toFixed(1)

        });
        // racuna[0]= ((racuna[0]/x.length)*100).toFixed(1);
        // racuna[1]= ((racuna[1]/x.length)*100).toFixed(1);
        // racuna[2]= ((racuna[2]/x.length)*100).toFixed(1);
        // racuna[3]= ((racuna[3]/x.length)*100).toFixed(1);
        // racuna[4]= ((racuna[4]/x.length)*100).toFixed(1);

        return racuna;
    }



    ///Funkcija uzima polje piksla u jednodimenzionlnom polju[r,g,b,a,r,g,b,a.....] te svaki kanal boje okreće sa formulom 255-r....
    const obrniRGB = (x = []) => {
        let polje = [];

        let duzina = x.data.length;

        for (let i = 0; i < x.data.length; i = i + 4) {
            let rgb = [];
            //console.log(x.data[i]);
            polje.push(255 - x.data[i]);
            polje.push(255 - x.data[i + 1]);
            polje.push(255 - x.data[i + 2]);
            polje.push(x.data[i + 3]);

        }
        //jednodimenzionlnom polju[r,g,b,a,r,g,b,a.....] 
        return polje;

    }
    /// funkcija načina prosječnu vrijednost svih piksii u određenom kanalu npr R +R +R .../broj piksla te frača s obzirom da je crno bijela slika samo jednu prosječnu vriijednos sive boje
    const dajProsjekRgb = function (x = []) {
        // console.log('x',x);
        let uk = x.reduce((ak, val) => {
            //  console.log('akaaaa',ak);
            ak[0] = ak[0] + val[0];
            ak[1] = ak[1] + val[1];
            ak[2] = ak[2] + val[2];
            ak[3] = ak[3] + val[3];
            return ak;

        }
            , [0, 0, 0, 0])
        uk = uk.map(y => y / x.length);
        // console.log('uk',uk);
        uk = Math.ceil(uk[0]);
        return uk;
    };
    // funkcija uzima polje oblika [[rgba],[rgba].....] te za određeni raspon pikslu u tom rasponu mjenja boju u r g ili u bjelu
    // sve crne i sive manje od prosjeka pretvara u bjele od prosjeka do 150 u zelene a ostale koji su veći od 150 u crvene
    const rafiniraj = function (po = [], pro = 110) {
        // console.log('polj',po);

        let rez = po.reduce((ak, val) => {
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
    const prosjekRafinirani = function (po = [], pro = 110) {
        let poRaf = po.filter(val => (val[0] < pro || val[1] < pro || val[2] < pro));
        return poRaf.length / po.length;

    };

    // funkcija za pravljenje objkata pridruženih  globalno polju stanje
    //Polje sadrži objekte tipa {naslov:x,prosjek:y,rgbprosjek:z,deep:true,superf:false}

    const napraviObjekt = function (x = '', y = 0, z = 0) {
        let naslov = x;
        let deep = /deep/ig.test(naslov);
        let superf = /superficial/ig.test(naslov);
        // console.log('deep', deep);
        // console.log('superficijal', superf);
        return {
            naslov: x,
            prosjek: y,
            rgbprosjek: z,
            deep: deep,
            superf: superf

        }
    }



    const daliJeImeDeepiliSuperficijal = function(naslov){

        let deep = /deep/ig.test(naslov);
        let superf = /superficial/ig.test(naslov);
        return deep||superf;

    }
    // statističke funkcije uzimaju polje podataka i računaju

    //let polje = [30,1,12,8,1,7,24,4,4,6,20,10,3,2,22,23,8,6,5,25,16,3,1,14,15,18,2,6,27,19,12,4,20,14,3,13,8,15,30,5,7,16];



    const arimetickaSredina = function (po = []) {
        let zbroj = po.reduce((ak, val) => {
            return ak + Number(val);

        }, 0)
        let N = po.length || 1;
        return (zbroj / N).toFixed(2)
    }
    //console.log('aritmetička sredina',arimetickaSredina(polje));

    const medijan = function (po = []) {
        let po1 = [...po];
        po1.sort((a, b) => a - b);
        //console.log('polj',po1);
        if (po1.length) {
            let N = po1.length;
            //  console.log('n',N)
            let sredina = Math.floor(N / 2);
            //  console.log('sredina',po1[sredina])
            // console.log('sredina-1',po1[sredina-1])

            if (N % 2 === 0) {
                let a = Number(po1[(sredina - 1)]);
                let b = Number(po1[sredina]);
                let r = (a + b) / 2;

                return r.toFixed(2);
            } else {

                return Number(po1[sredina]).toFixed(2);
            }


        }
    }
    //console.log('medijan',medijan(polje))

    const raspon = function (po = []) {
        let sortirano = [...po];
        //console.log('sort',po,sortirano)
        sortirano.sort((a, b) => a - b);
        // console.log('sort',po,sortirano)

        return (Number(sortirano[(sortirano.length - 1)]) - Number(sortirano[0])).toFixed(2);
    }

    //console.log('raspon',raspon(polje))

    const prosAbOdstOdAritSred = function (po = [], aritSredina = arimetickaSredina(po)) {
        //let aritSredina = arimetickaSredina(po);
        let odstupanje = po.reduce((ak, val) => {
            return ak + Math.abs(Number(val) - aritSredina);
        }, 0)
        return (odstupanje / po.length).toFixed(2);

    }

    //console.log('prosječno odstupanje' ,prosAbOdstOdAritSred(polje))

    const varijanca = function (po = [], aritSredina = arimetickaSredina(po)) {
        let odstupanjeKvadratno = po.reduce((ak, val) => {
            return ak + Math.pow((Number(val) - aritSredina), 2);

        }, 0)
        return (odstupanjeKvadratno / po.length).toFixed(4);


    }

    const stanDevijacija = function (po = []) {
        return (Math.sqrt(varijanca(po))).toFixed(4);
    }

    //console.log('varijanca',varijanca(polje))

    //console.log('standardna devijacija',stanDevijacija(polje))
 const dajBrojelemenata = function(po=[]){
     return po.length;
 }


    const frekvencija = function (po = []) {
        let poSort = [...po].sort((a, b) => a - b);
        let prvi = poSort[0];
        let brojac = 0;
        let poljeFrek = [];
        //console.log('sortirani ulaz',poSort);
        const fukObj = function (ime, broj) {
            return { ime, broj };
        };

        const fukPolje = function (ime, broj) {
            return [ime, broj];
        };
        //izlaz objekt

        /*
        poljeFrek = poSort.reduce((ak,val)=>{
            if(val===prvi){
                brojac++;
                if(val===poSort[(poSort.length-1)]){
                ak.push(fukObj(prvi,brojac));
              }  
        
          }else{
              ak.push(fukObj(prvi,brojac));
              brojac=1;
        
              prvi = val;
              if(val===poSort[(poSort.length-1)]){
                ak.push(fukObj(prvi,brojac));
              }
          }
        */

        // izlaz polje
        poljeFrek = poSort.reduce((ak, val, i) => {
            if (val === prvi) {
                brojac++;
                if (i === (poSort.length - 1)) {
                    // console.log('fb',fukPolje(prvi,brojac))
                    ak.push(fukPolje(prvi, brojac));
                }

            } else {
                ak.push(fukPolje(prvi, brojac));
                brojac = 1;

                prvi = val;
                if (i === (poSort.length - 1)) {
                    //  console.log('fb',fukPolje(prvi,brojac))
                    ak.push(fukPolje(prvi, brojac));
                }

            }

            return ak;


        }, []);

        return poljeFrek;

    }


    const grupiranjeFrekvencija = function (po = [], raspon = 1) {


        let fren = frekvencija(po);
        const duzina = fren.length;
        let prvi = fren[0][0];
        let brojac = 0;
        let grupa = [];

        // console.log('frenkvencija',fren);
        for (let i = 0; i < duzina - 1; i++) {
            if ((fren[i][0] - prvi) < raspon) {
                brojac = brojac + fren[i][1];
                if (i === duzina - 2) {
                    grupa.push(brojac);
                }
            } else {
                grupa.push(brojac);
                brojac = fren[i][1];
                prvi = fren[i][0];

                if (i === duzina - 2) {
                    grupa.push(fren[duzina - 2][1]);
                    grupa.push(fren[duzina - 1][1]);
                }
            }



        }
        return grupa;

    }

    const dajNajmanje = function (po, x) {
        let rez = [];
        for (let i = 0; i < x; i++) {
            rez.push(po[0]);

        }
        return rez;
    }
    const relativnoStandardnoOdstupanje = function (po = []) {
        let x = arimetickaSredina(po);
        let s = stanDevijacija(po);


        let rsd = (s / x) * 100;
        if (isNaN(rsd)) rsd = 0;
        return rsd.toFixed(2);




    }



    const frekvencijePromise = function(polje=[],korak=1){

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


    ///*******funkcija statističke obrade unos polje vrijednosti izlaz objekt sa vrijednostima

    const napraviObradu = function (deepPolje = [], x = deepPolje[0]) {
        let deepBezPrvog = deepPolje.slice(1, deepPolje.length);
        if (deepPolje.length <= 1) {
            deepBezPrvog = [0];
        };
        const aritmetičkaSredina =arimetickaSredina(deepPolje);
        const odstupanjeOdSredine = prosAbOdstOdAritSred(deepPolje, arimetickaSredina);
      const   varijanca_izracun= varijanca(deepPolje, aritmetičkaSredina);

        return {
            brojElemenata:dajBrojelemenata(deepPolje),
            //aritmetičkaSredina: arimetickaSredina(deepPolje),
            aritmetičkaSredina,
            medijan: medijan(deepPolje),
            raspon: [deepPolje[0], deepPolje[deepPolje.length - 1]],
          //  odstupanjeOdSredine: prosAbOdstOdAritSred(deepPolje, this.arimetickaSredina), // popraviti poslije
            //odstupanjeOdSredine: prosAbOdstOdAritSred(deepPolje, arimetickaSredina(deepPolje)),
            odstupanjeOdSredine,
            //varijanca: varijanca(deepPolje, this.aritmetičkaSredina), //popraviti poslije
            //varijanca: varijanca(deepPolje, arimetickaSredina(deepPolje)),
            varijanca:varijanca_izracun,
            standardnaDevijacija: stanDevijacija(deepPolje),
            // frekvencija:frekvencija(deepPolje),
            //grupiranjeFrekvencija:grupiranjeFrekvencija(deepPolje,5),
            najmanji: x,//deep[0]|| deepPolje[0],
            rsd: relativnoStandardnoOdstupanje(deepPolje),
            standarDevBezNajmanjeg: stanDevijacija(deepBezPrvog)


        };
    }


    //funkcija obrada podataka ulazni parametar je polje stanje
    const obradaPodataka = function (sta = []) {

        let deep = sta.filter(x => x.deep).sort((a, b) => a.prosjek - b.prosjek);
        let superf = sta.filter((x => x.superf)).sort((a, b) => a.prosjek - b.prosjek);

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



    ////***********************crtanje grafa******************************


    
const nacrtajGrafCanvas = function(polje = []){
    //console.log('graf',polje);
    if ( polje.length>0){
    let zadnji = polje[polje.length-1];
    //console.log('zadnji',zadnji);
    let z ;
   if( zadnji===undefined){
       z=0;
   }else{
       z=zadnji[zadnji.length-1];
   }
   //console.log('z',z);
    let raspon = [polje[0][0],z];
 const razmak = 5;
let frek =Number( raspon[0]);
//console.log('frek',frek)

const boje = ["lightblue","lightgreen","pink","silver","lightblue","lightgreen","pink","silver","lightblue","lightgreen","pink","silver"]

let razlika = Number(raspon[1])-Number(raspon[0]);
//console.log('razlika',razlika)
let sirina = Math.ceil(razlika/ razmak);
if(sirina ===0) sirina =1;
//console.log('sirana',sirina)
//console.log('polje',polje,'raspon',raspon)
let faktor =Math.ceil( 240/razlika);
//console.log('faktor',faktor);
let brojStpoaca = polje.length;
let korak = Math.ceil( razlika/brojStpoaca)*faktor;
//console.log('korak',korak);

let can2 = document.createElement('canvas');
    can2.setAttribute('width','300px');
    can2.setAttribute('height','300px');



let graf = can2.getContext("2d");

graf.strokeRect(0,0,300,300)



let xGraf = 10;
let yGraf = 0;
let najveciStupac = polje.reduce((rez,val)=>{
   return rez<val.length?val.length:rez;

},-Infinity)
//console.log('najveci',najveciStupac);
let brojac = 0
console.log('grafx',xGraf);

const crtajGraf = function(x){
let visina = (x.length/najveciStupac)*300*0.8;
//console.log('visina',visina)
yGraf= 299-visina;
graf.fillStyle= boje[brojac] || "blue";
graf.fillRect(xGraf,yGraf,30,visina);
graf.save();
graf.font="20px Times";
graf.fillStyle = 'red';
graf.translate(xGraf+10,80)
//graf.rotate(90*Math.PI/180);
    graf.fillText(x.length,0,0)
    graf.restore();
    graf.save();
graf.font="10px Times";
graf.fillStyle = 'red';
graf.translate(xGraf+5,290)
//graf.rotate(90*Math.PI/180);
    graf.fillText(x[0],0,0)
    graf.restore(); 

xGraf = xGraf +korak;
brojac++
frek=frek+Number(sirina);
//console.log('frek2',frek,'sirina',sirina);
}


polje.forEach(crtajGraf)
return can2;
    }
    else {
        return document.createElement('div');
    }
 }



 

//
const dajDep = function (x=[],y=1){

let mapx = x.deep.map((x)=>x.prosjek);
frekvencijePromise(mapx,y)
       .then(x=>{

          // console.log('x',x);
          // console.log('stanjekn1',stanje);
          
          // console.log('stanjekn2',stanje);
        let graf = nacrtajGrafCanvas(x);
        kontejnerTablica.insertAdjacentHTML("beforeEnd","<h3>deep</h3>")
       // kontejnerTablica.appendChild(graf);
        kontejnerTablica.insertAdjacentElement('beforeEnd',graf);
        //console.log('deep frekvencija',x, 'raspon ', rasponD)
        }
       )

/*

x.deep.map((x)=>x.prosjek)
    //    .then(x=>frekvencija(x))
    //    .then(x=>grupiranjeFrekvencijaP(x,3))
    Promise.resolve(x)
    .then(x=>frekvencijePromise(x,8))
       .then(x=>{

          // console.log('x',x);
          // console.log('stanjekn1',stanje);
          
          // console.log('stanjekn2',stanje);
        let graf = nacrtajGrafCanvas(x);
        kontejnerTablica.insertAdjacentHTML("beforeEnd","<h3>deep</h3>")
       // kontejnerTablica.appendChild(graf);
        kontejnerTablica.insertAdjacentElement('beforeEnd',graf);
        console.log('deep frekvencija',x, 'raspon ', rasponD)}
       )
*/
}

const dajSuperf = function (x=[],y=1){
let mapx= x.superf.map((x)=>x.prosjek);

       frekvencijePromise(mapx,y)
       .then(x=>{
        let graf = nacrtajGrafCanvas(x);
        kontejnerTablica.insertAdjacentHTML("beforeEnd","<h3>superficijal</h3>")
       // kontejnerTablica.appendChild(graf);
        kontejnerTablica.insertAdjacentElement('beforeEnd',graf);
       // console.log('deep frekvencija',x, 'raspon ', rasponD)
        }
       )

}


const updateStanje = function(y=1){
//console.log ('rststanje',stanje)
//čitaj sttanje
// iteriraj kroz stanje
// za svako stanje crtaj view
// let proba = [...obrada];
// console.log('update st pr',proba);

    napraviTablicuObrade2(obrada);
    dajDep(obrada,y);
    dajSuperf(obrada,y);
klasaKlizaci.style.display = "block";

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
    const kontejner = document.getElementById('kontejner');
    const kontejnerTablica = document.getElementById('kontejnertablica')
    const spiner = document.getElementById('spiner');
    const linkObrada = document.getElementById('obrada');
    const detalji = document.getElementById('detalji_kontejner'); //novi

    linkObrada.addEventListener('click',function(){
        if(obrada.deep||obrada.superf){
      // console.log('obrad',obrada.deep.length,'super',obrada.superf);
        updateStanje();
        klasaKlizaci.style.display = "block";
        }
    })

  // pokazivač 
    const slider = document.getElementById('slider');
    const klasaKlizaci = document.querySelector(".klizac");

   klasaKlizaci.style.display ="none";
    const brojacSlider = document.getElementById("brojac__slider")
    slider.addEventListener("change",function(){
       // console.log("value",this.value);
        brojacSlider.innerHTML = this.value;
        updateStanje(this.value);
    })

    // id tablica
    const tablica = document.getElementById('tablica');

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
    fileInput.style.display = "none";

    // selekcija naslova za prikaz selektiranog elementa
    const prikazDat = document.getElementById('prikazdat');
    fileInput.addEventListener('change', () => {
        prikazDat.innerHTML = "";
        prikazDat.innerHTML = fileInput.files[0].name;
        gumb();
    })
    //  izaberi datoteku malo drukčije
    const izaberi = document.getElementById('izaberi');
    izaberi.addEventListener('click', e => {

        if (fileInput) {
            fileInput.click();
            // gumb();

        }
    }, false)




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
                        const podaci = document.createElement("div");
                        // kreira potrebni redak i ćelije za kreiranje tablice sa podacima
                        const redak = document.createElement('tr');
                        const poljeN = document.createElement('td');
                        const poljeR = document.createElement('td');
                        const poljeP = document.createElement('td');

                        const ul =document.createElement('ul');
                        const div = document.createElement('div');
                        div.className="kontejner_dl";
                        const dl = document.createElement('div');
                        observer.observe(dl);
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
                            podaci.innerHTML = ` RGB Prosjek ${rGb}  <br> 
    relativni postotak žila na ukupnoj na slici ${ prosjek} %`;
                            p1.textContent="RGB prosjek = "+rGb +" %";
                            p2.textContent="Relativni postotak žila = "+prosjek+" %";
                            li3.textContent=rGb;
                            figcaption.appendChild(p1);
                            figcaption.appendChild(p2);
                            li1.textContent=fileName;
                            li2.textContent=prosjek;
                            ul.appendChild(li1);
                            ul.appendChild(li2);
                            ul.appendChild(li3);
                            ul.appendChild(li4);
                            detalji.appendChild(ul);


                            // podaci za tablicu
                            poljeN.innerText = fileName;
                            poljeP.textContent = prosjek;
                            poljeR.textContent = rGb;
                            redak.appendChild(poljeN);
                            // redak.appendChild(poljeR);
                            redak.appendChild(poljeP);
                            tablica.append(redak);

                            // slika inverznih boja isključeno
                            //ctx.putImageData(obData,0,0);

                            // canvas element sa crveno zelenom slikom iz originala
                            ctx1.putImageData(obData1, 0, 0);
                            //inverzna slika dodana u kontejner Isključeno
                            // kontejner.appendChild(can);
                            /////NASLOV/////////
                            //kreira naslov slike iz podatka file.name i meće ga na vrh slike
                            let naslov = document.createElement('h4');
                            naslov.innerHTML = fileName;

                            kontejner.appendChild(naslov);

                            // dadana canvas slika crveno zelena u kontejner
                            kontejner.appendChild(can1);
                            figure2.appendChild(can1);
                            figure2.appendChild(figcaption);
                            dl.appendChild(figure2);
                            div.appendChild(dl);
                            detalji.appendChild(div);

                            // dodana tablica u kontejner
                            kontejner.appendChild(podaci);
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



        }
        /// pozcziva funkcij
        napraviFunkciju();
       
    }
/*
     ///observer
     const gumb_pokazi = document.querySelectorAll('.gumb_pokazi');
     console.log(gumb_pokazi);
     gumb_pokazi.forEach(gumb=>{
         gumb.addEventListener('click',e=>{
             e.currentTarget.classList.toggle("gumb_dolje");
             e.currentTarget.parentElement.parentElement.nextElementSibling.classList.toggle('pokazi_dl');
 
         })
 
     });
    
     const observer= new ResizeObserver(ulaz=>{
         ulaz.forEach(dl=>{
             const visina = dl.contentRect.height+'px';
             dl.target.parentElement.style.setProperty('--visina',visina);
 
 
         })
     });
     const dl_detalji = document.querySelectorAll(".kontejner_dl>div");
     dl_detalji.forEach(dl=>observer.observe(dl));
  */