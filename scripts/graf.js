 ////***********************crtanje grafa******************************


    
 export const nacrtajGrafCanvas = function(polje = []){

    if ( polje.length>0){
    const zadnji = polje[polje.length-1];
    let z ;
   if( zadnji===undefined){
       z=0;
   }else{
       z=zadnji[zadnji.length-1];
   }
    const raspon = [polje[0][0],z];
 const razmak = 5;
let frek =Number( raspon[0]);


const boje = ["lightblue","lightgreen","pink","silver","lightblue","lightgreen","pink","silver","lightblue","lightgreen","pink","silver"]

const razlika = Number(raspon[1])-Number(raspon[0]);
const sirina = Math.ceil(razlika/ razmak);
if(sirina ===0) sirina =1;
const faktor =Math.ceil( 240/razlika);
const brojStpoaca = polje.length;
const korak = Math.ceil( razlika/brojStpoaca)*faktor;
const can2 = document.createElement('canvas');
    can2.setAttribute('width','300px');
    can2.setAttribute('height','300px');

const graf = can2.getContext("2d");

graf.strokeRect(0,0,300,300)

let xGraf = 10;
let yGraf = 0;
const najveciStupac = polje.reduce((rez,val)=>{
   return rez<val.length?val.length:rez;

},-Infinity)
//console.log('najveci',najveciStupac);
let brojac = 0

const crtajGraf = function(x){
const visina = (x.length/najveciStupac)*300*0.8;
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

}


polje.forEach(crtajGraf)
return can2;
    }
    else {
        return document.createElement('div');
    }
 }
