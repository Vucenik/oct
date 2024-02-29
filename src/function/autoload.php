<?php

spl_autoload_register(function(string $class_name):void{
    echo dirname(__FILE__,3).'/src/classes/'."$class_name".'.class.php';
    include dirname(__FILE__,3).'/src/classes/'."$class_name".'.class.php';
})
?>