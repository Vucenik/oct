<?php

/*
Ruter.class.php
Shop
Vlatko Vučenik
Last Modified:25.04.2023 
*/ 
final class Ruter  {
    //statična funkcija učitava string kao naziv php stranice i mapira ga ko naciiv rute oblika /naziv tako da napravi novu funkciju sa includ i koja se pozica iz polja
    protected static function ucitaj (string $k):callable{
        return function() use($k){
            $path = APP_ROOT.'/src/pages'.$k.'.php';


            if(!file_exists($path)){  
                include APP_ROOT.'/src/pages/greska.html';
               // include APP_ROOT.'/templates/greska_template.php';
                exit;
                 };
                 include $path;
           
            };
    }
    // polje koje sprema rute i njima pridruženu funkcije
   protected  static $polje =[
    'get'=>[],
    'post'=>[],
    'delet'=>[],
    'put'=>[],
    'head'=>[],
    'patch'=>[]
];
// polje sa rutom i parametrom
protected static array $parametri = []; // ruta tipa home/{id}

   //pjavna funkcija pomoću koje se registrira putanja sa pridruženoj funkciji ili se generira funkcija koja radi include sa putanjom do stranice  
   public static function set(string $kljuc,callable $fn=NULL,string $method = 'get'):void{
    $method=strtolower($method);
    // regular pattern za dodatni parametat tipa '/home/kosara/{id}'
    $patern= "/\/{.*}/i";
    if(preg_match($patern,$kljuc)){
        
        $explode = explode('/',$kljuc);
        $zadnji_el = end($explode);
        $pattern_param = "/[{}]/i";
        $parametar = preg_replace($pattern_param,'',$zadnji_el);
        $kljuc = preg_replace($patern,'',$kljuc);
        self::$parametri[$kljuc]=$parametar;

    }
// obrada rute tip ruta tipa home/{id}

       if(!isset($fn)){
        
        self::$polje[$method][$kljuc]=self::ucitaj($kljuc);
        return;
       }
       self::$polje[$method][$kljuc]=$fn;

    }
    // dohvaća funkciju i pokreće je prema datoj putanji kao ključu za polje
    public static function run(string $kljuc,string $method = 'get'):callable{

        $method=strtolower($method);
     
        if(!array_key_exists($kljuc, self::$polje[$method])){
            include APP_ROOT.'/src/pages/greska.html';
        //  include APP_ROOT.'templates/greska_template.php';
            exit; 
        }
        return self::$polje[$method][$kljuc];
    }
    public static function get_root(){
        return self::$polje;
    }
    public static function get_parametri(){
        return self::$parametri;
    }

}




?>