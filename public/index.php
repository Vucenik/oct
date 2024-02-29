<?php
/*index.php
"OCT Angio analizator
Vlatko Vučenik
29/02/2024
*/

require '../config/config.php';
echo APP_ROOT.'<br>';
echo TEMPLATE_DIR.'<br>';
echo DOC_ROOT.'<br>';
echo APP_DOMAIN.'<br>';
echo DOC_ROOT.'<br>';
echo HTTP_ROOT.'<br>';


$request = new Request();

//Ruter::set('/naruci',$kontroler->naruci());


Ruter::run($request->get_path(),$request->get_method())();
?>