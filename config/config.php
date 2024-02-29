<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



define('APP_ROOT',dirname(__FILE__,2)); //dirtektorij od index.php
define("APP_DOMAIN",$_SERVER['HTTP_HOST']);
define('ROOT_FOLDER','/');

$this_folder = substr(__DIR__,strlen($_SERVER['DOCUMENT_ROOT']));
$parent_folder = dirname($this_folder);
$parent_folder=ltrim($parent_folder,'/');
//define("DOC_ROOT",$parent_folder.DIRECTORY_SEPARATOR.ROOT_FOLDER.DIRECTORY_SEPARATOR);
//define("DOC_ROOT",$parent_folder.'/'.ROOT_FOLDER.'/');
define('HTTP_ROOT',pathinfo($_SERVER['PHP_SELF'],PATHINFO_DIRNAME));
define("DOC_ROOT",'/'.$parent_folder);
//define("DOC_ROOT",$parent_folder.'');
define('TEMPLATE_DIR', APP_ROOT.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR);
define('TEMPLATE', DOC_ROOT.'/templates'.DIRECTORY_SEPARATOR);
define('HTML_PAGE',APP_ROOT.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'pages'.DIRECTORY_SEPARATOR);
require APP_ROOT.'/src/function/autoload.php';


?>