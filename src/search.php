 <?php

require '../vendor/autoload.php';
use KubAT\PhpSimple\HtmlDomParser;
$page = 'http://www.phimmoi.net/tim-kiem/';
$html ='';
$key  = $_GET['key'];
$result = [];
try{
    $html = HtmlDomParser::file_get_html($page.$key.'/');

}catch(Exception $e){
    echo $e->getMessage();
};

foreach($html->find('li.movie-item') as $item){
    $title = $item->find('.block-wrapper',0)->title;
    $link = $item->find('.block-wrapper',0)->href;

    $reg = "/[(].+[)]/";
    $style = $item->find('.movie-thumbnail',0)->style;
    preg_match($reg, $style, $match);
    $img = trim($match[0],'/[()]/');
    $result[] = [
        'title'=>$title,
        'link' =>$link,
        'style' => $img
    ];
};
header("Content-type: application/json; charset=utf-8");
 echo json_encode(['movies'=>$result],JSON_UNESCAPED_UNICODE);

