<?php
/*
Response.class.php
Oct analizator
Vlatko Vučenik
Last Modified:29.02.2023 12:30
*/ 
final class Response
{
    public function ispisi_json(array $data=[])
    {
        header("HTTP/1.0 200 OK");
        header("Content-Type:application/json;charset=utf-8");
        echo(json_encode(['data'=>$data], true));
    }
    public function ok(string $tekst)
    {
        header("HTTP/1.0 200 OK");
        header("Content-Type:text/plain;charset=utf-8");
        echo $tekst;
    }
    public function bad(string $tekst)
    {
        header("HTTP/1.1 404 Not Found");
        header("Content-Type:text/plain;charset=utf-8");
        echo $tekst;
    }

public function show(string $name, array $podaci =['title'=>'','script'=>'','model'=>[]])
{
    $path = TEMPLATE_DIR
    .$name.'_template.php';
    header("HTTP/1.1 200 OK");
    header("Content-Type:text/html;charset=utf-8");
    header("X-Frame-Options:DENY");//prevent click jacking


    if (!file_exists($path)) {
        echo "greska";
        include APP_ROOT.'/src/pages/greska.html';
        exit;
    };
    include $path;
}
public function redirect(string $location,int $code=302):void{
    http_response_code($code);
    header('Location:'.$location);
}
public function html (string $html):callable{

    return function () use ($html) {
  echo("<br>html ".$html);
      if( file_exists( APP_ROOT.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'pages'.DIRECTORY_SEPARATOR.$html)){
        header("HTTP/1.1 200 OK");
        header("Content-Type:text/html;charset=utf-8");
        header("X-Frame-Options:DENY");//prevent click jacking
    
        echo   file_get_contents( APP_ROOT.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'pages'.DIRECTORY_SEPARATOR.$html) ;
      }else{
        header("HTTP/1.1 404 Not Found");
        header("Content-Type:text/plain;charset=utf-8");
       include APP_ROOT.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'pages'.DIRECTORY_SEPARATOR.'greska.html';
      }
    };
  }
}

?>