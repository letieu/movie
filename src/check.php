<?php
require '../vendor/autoload.php';
use KubAT\PhpSimple\HtmlDomParser;
$page = 'http://www.phimmoi.net/';
$html ='';

$link_film = $_GET['film'];
$res = true;
$keyHD = 'Bản đẹp';
$keyTrailer = 'Trailer';

$hd = false;
$trailer = false;

try{
    $html = HtmlDomParser::file_get_html($page.$link_film);

}catch(Exception $e){
    echo $e->getMessage();
};
$quality = $html->find('dd.movie-dd');
foreach ($quality as $q){
    if (trim($q->plaintext,' ') == $keyHD){
        $hd = true;
        
    }
    if(trim($q->plaintext,' ') == $keyTrailer){
        $trailer = true;
        
    }
}


if ($trailer || !$hd){
    $res = false;
}
header("Content-type: application/json; charset=utf-8");
 echo json_encode(['q'=>$res]);


$html->__destruct();
unset($html);
$html = null;

?>