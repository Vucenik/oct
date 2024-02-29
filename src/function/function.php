<?php

// use html
function html (string $html):callable{

    return function () use ($html) {
  
      if( file_exists( APP_ROOT.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'pages'.DIRECTORY_SEPARATOR.$html)){
        echo   file_get_contents( APP_ROOT.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'pages'.DIRECTORY_SEPARATOR.$html) ;
      }else{
       include APP_ROOT.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'pages'.DIRECTORY_SEPARATOR.'greska.html';
      }
    };
  }

?>