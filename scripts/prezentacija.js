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
