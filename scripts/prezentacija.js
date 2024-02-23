////Tablica deep superficila

export const napraviTablicu = function (po = [],naslov="") {

    const tablica = document.createElement('table');
    const caption = document.createElement("caption");
    caption.textContent=naslov;
    tablica.appendChild(caption);

    
    tablica.setAttribute('class', 'tablica');
    // tablica.setAttribute('id',id);
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    const th1 = document.createElement('th');
    th.textContent = 'Slika naslov';
    tr.appendChild(th);
    th1.textContent = 'udio žila i kapilara u%';
    tr.appendChild(th1);
    tablica.appendChild(tr);

    po.forEach(x => {
        const trp = document.createElement('tr');
        const td = document.createElement('td');
        const td1 = document.createElement('td');
        td.innerText = x.naslov;
        trp.appendChild(td);
        td1.innerText = x.prosjek;
        trp.appendChild(td1);
        tablica.appendChild(trp);

    })

    return tablica;


}
 //// Tablica  statističke obrade
export const napraviTablicuObrade2 = function(obrada={},kontejnerTablica){
        
   
    //kontejnerTablica.style.display = 'block';
while (kontejnerTablica.firstChild) {
    kontejnerTablica.removeChild(kontejnerTablica.firstChild);
}
//console.log('obrada',obrada);
let odstupanjeOdSredineDeep = obrada.deepObrada.odstupanjeOdSredine;
let aritmetičkaSredinaDeep = obrada.deepObrada.aritmetičkaSredina;
let medijanDeep = obrada.deepObrada.medijan;
let raspon1Deep = obrada.deepObrada.raspon[0];
let raspon2Deep = obrada.deepObrada.raspon[1];
let varijancaDeep = Number.parseFloat(obrada.deepObrada.varijanca).toFixed(2);
let devijacijaDeep =Number.parseFloat( obrada.deepObrada.standardnaDevijacija).toFixed(2);
let rsdDeep = Number.parseFloat(obrada.deepObrada.rsd).toFixed(2);
let brojEelemenataDeep = obrada.deepObrada.brojElemenata;


let aritmetičkaSredinaF = obrada.superfObrada.aritmetičkaSredina;
let medinaF = obrada.superfObrada.medijan;
let raspon1F = obrada.superfObrada.raspon[0];
let raspon2F = obrada.superfObrada.raspon[1];
let odstupanjeOdSredineF = obrada.superfObrada.odstupanjeOdSredine;
let varijancaF =Number.parseFloat(obrada.superfObrada.varijanca).toFixed(2);
let rsdF = Number.parseFloat(obrada.superfObrada.rsd).toFixed(2);
let brojEelemenataF = obrada.deepObrada.brojElemenata;

//let devijacijaF = obrada.superfObrada.standardnaDevijacija?obrada.superfObrada.standardnaDevijacija:"";
let devijacijaF = Number.parseFloat(obrada.superfObrada.standardnaDevijacija).toFixed(2);


const obradaDeep = `
<table class="statistika">
        <caption>
            Statističaka obrada DEEP
        </caption>
        <thead>
            <tr>
                <th scope="col">Staistička funkcija</th>
                <th scope="col">Statistička vrijednost</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Broj elemenata N = </th>
                <td>${brojEelemenataDeep}</td>
            </tr>
            <tr>
                <th scope="row">Aritmetička sredina</th>
                <td>${aritmetičkaSredinaDeep} </td>
            </tr>
            <tr>
                <th scope="row">Medijan </th>
                <td>${medijanDeep}</td>
            </tr>
            <tr>
                <th scope="row">Raspon </th>
                <td>${raspon1Deep} - ${raspon2Deep} </td>
            </tr>
            <tr>
                <th scope="row">Prosječno odstupanje od aritmetičke sredine </th>
                <td>${odstupanjeOdSredineDeep} </td>
            </tr>
            <tr>
                <th scope="row">Varijanca </th>
                <td>${varijancaDeep}</td>
            </tr>
            <tr>
                <th scope="row">Standardna devijacija </th>
                <td>${devijacijaDeep} </td>
            </tr>
            <tr>
                <th scope="row">Relativna standardna devijacija </th>
                <td>${rsdDeep}</td>
            </tr>
        </tbody>
    </table>

`;

let obradaSuper = `
<table class="statistika">
        <caption>
            Statističaka obrada SUPERFICIJAL
        </caption>
        <thead>
            <tr>
                <th scope="col">Staistička funkcija</th>
                <th scope="col">Statistička vrijednost</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Broj elemenata N = </th>
                <td>${brojEelemenataF} </td>
            </tr>
            <tr>
                <th scope="row">Aritmetička sredina</th>
                <td>${aritmetičkaSredinaF} </td>
            </tr>
            <tr>
                <th scope="row">Medijan </th>
                <td>${medinaF}</td>
            </tr>
            <tr>
                <th scope="row">Raspon </th>
                <td>${raspon1F} - ${raspon2F} </td>
            </tr>
            <tr>
                <th scope="row">Prosječno odstupanje od aritmetičke sredine </th>
                <td>${odstupanjeOdSredineF} </td>
            </tr>
            <tr>
                <th scope="row">Varijanca </th>
                <td>${varijancaF}</td>
            </tr>
            <tr>
                <th scope="row">Standardna devijacija </th>
                <td>${devijacijaF} </td>
            </tr>
            <tr>
                <th scope="row">Relativna standardna devijacija </th>
                <td>${rsdF}</td>
            </tr>
        </tbody>
    </table>


`

kontejnerTablica.appendChild(napraviTablicu(obrada.deep,'Obrada DEEP'));
kontejnerTablica.insertAdjacentHTML('beforeEnd', obradaDeep);

kontejnerTablica.appendChild(napraviTablicu(obrada.superf,"Obrada SUPERFICIJAL"));
kontejnerTablica.insertAdjacentHTML('beforeEnd', obradaSuper);


}