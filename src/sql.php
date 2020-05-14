<?php

require '../vendor/autoload.php';
$servername = 'localhost';
$username = 'root';
$dbname = 'movie';
$password ='';

$obj = json_decode(file_get_contents('php://input')); 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error){
    die('Connect error');
}

$sql = "INSERT INTO sub(mail,link) VALUE($obj->mail,$obj->film)";

if ($conn->query($sql) === TRUE ){
    echo "done";
}else{
    echo 'error';
}

?>