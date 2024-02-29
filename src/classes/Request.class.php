<?php
/*
Request.class.php
Prognoze
Vlatko Vučenik
Last Modified:26.04.2023 16:40
*/ 
final class Request{

   
    private array $data=[];
    private string $body = "";
    private string $path="/";
    private string $method ="get";
    public function __construct()
    {
   
    $this->body = file_get_contents('php://input');
    $this->method =strtolower($_SERVER["REQUEST_METHOD"]);
   
        
    switch($this->method) {
        case 'post':
            $this->data=$_POST;
            break;
        case 'put':
            $this->data= json_decode($this->body,true);
            break;
        case 'delete':
            $this->data=json_decode($this->body,true);
            break;
        case 'get':
            $this->data=$_GET;
            break;
    };
   // echo $_SESSION['admin'];
  
 
   


    if(isset( $_SESSION["admin"])){
        $this->set_data('admin',$_SESSION["admin"]); 
    }
    $this->method=$this->get_data('_method')?strtolower($this->get_data('_method')):$this->method;
}
    public function get_data(string $key){
        if(isset($this->data[$key])){
            return $this->data[$key];
        }
        return false;
    }
    public function set_data(string $key,$vrijednost):void{

        $this->data[$key]=$vrijednost;
    }
    public function get_path():string{
        $parametri = Ruter::get_parametri();
        $staza =$_SERVER['PATH_INFO']??"/";
       // $staza =pathinfo($_SERVER['REQUEST_URI'],PATHINFO_DIRNAME)??"/";
      // $staza =explode('?',$_SERVER['REQUEST_URI'])[0];
      // echo 'staza'.$staza;
     //  if(DOC_ROOT!=='/') $staza=str_replace(DOC_ROOT,'',$staza);
        $pattern = '/.[\/]$/i';
    
        if(preg_match($pattern,$staza)){
            $staza=preg_replace('/[\/]$/i','',$staza);
     
        } 
     
        $explode = explode('/',$staza);
      
        $param = array_slice($explode,-1,1);
      $ruta = implode('/',array_slice($explode,0,-1));
     
        if(key_exists($ruta,$parametri)){
            $naziv = $parametri[$ruta];
            $this->set_data($naziv,$param[0]);
            $this->path=$ruta;
        }else{
            $this->path=$staza;
        }
        return $this->path;
    }
    public function set_path(string $path):void{
        $this->path=$path;

    }
    public function get_method():string{
        return $this->method;
    }
    public function all():array{
        return $this->data;
    }
}


?>