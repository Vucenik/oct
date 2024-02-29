
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


    const raspon = function (po = []) {
        let sortirano = [...po];
        //console.log('sort',po,sortirano)
        sortirano.sort((a, b) => a - b);
        // console.log('sort',po,sortirano)

        return (Number(sortirano[(sortirano.length - 1)]) - Number(sortirano[0])).toFixed(2);
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
    