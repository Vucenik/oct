<?php
define('APP_ROOT',dirname(__FILE__,2));
define('ROOT_FOLDER','public');
//define('ROOT_FOLDER','');
define ('UPLOADS',APP_ROOT.DIRECTORY_SEPARATOR.ROOT_FOLDER.DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR);

require APP_ROOT.'/config/config.php';
require APP_ROOT.'/vendor/autoload.php';
require APP_ROOT.'/src/function.php';
require APP_ROOT.'/vendor/PHPMailer/src/Exception.php';
require APP_ROOT.'/vendor/PHPMailer/src/PHPMailer.php';
require APP_ROOT.'/vendor/PHPMailer/src/SMTP.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
//Session::start();
$template = new Template;
$view =new View($template);
$model = new Model;
$controller = new Controller($view,$model);
$app=new App($controller,$view);
?>



