<?php
/*index.php
"OCT Angio analizator
Vlatko Vučenik
29/02/2024
*/

require '../config/config.php';


$request = new Request();
$response = new Response();

Ruter::set('/',$response->html('octanalizator.html'));
Ruter::set('',$response->html('octanalizator.html'));
Ruter::set('/home',$response->html('octanalizator.html'));
Ruter::set('/reader',$response->html('octevvJsonReader.html'));
Ruter::set('/projekt',$response->html('projekt.html'));
Ruter::run($request->get_path(),$request->get_method())();

?>