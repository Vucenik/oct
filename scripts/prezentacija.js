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
let brojEelemenataF = obrada.superfObrada.brojElemenata;

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

export const napravi_slike=(kontejner,podaci={img:"",rGb:"",prosjek:"",fileName:"",can1:"",observer:""})=>{
  //  detalji.insertAdjacentHTML('afterbegin',"<ul><li>oznaka slike</li><li>udio žila i kapilara u %</li><li>RGB </li><li></li></ul>");

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
  


  figure1.appendChild(podaci.img);
  dl.appendChild(figure1);/*  */
  p1.textContent="RGB prosjek = "+podaci.rGb ;
  p2.textContent="Relativni postotak žila = "+podaci.prosjek+" %";
  li3.textContent=podaci.rGb;
  figcaption.appendChild(p1);
  figcaption.appendChild(p2);
  li1.textContent=podaci.fileName;
  li2.textContent=podaci.prosjek+" %";
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  ul.appendChild(li4);
kontejner.appendChild(ul);
figure2.appendChild(podaci.can1);
figure2.appendChild(figcaption);
 dl.appendChild(figure2);
div.appendChild(dl);
kontejner.appendChild(div);
podaci.observer.observe(dl);

}

// radi popis daoteka iz polja
export const imena_datoteke = polje=>{
   
    return polje.reduce((ak,val)=>{
ak=ak+`<li>${val.ime}</li>`
return ak;
    },"<ul>")+"</ul>";

   }