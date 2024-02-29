<?php

spl_autoload_register(function(string $class_name):void{
   
    include dirname(__FILE__,3).'/src/classes/'."$class_name".'.class.php';
})
?>