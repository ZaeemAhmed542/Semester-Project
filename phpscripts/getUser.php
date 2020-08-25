<?php 
session_start();
ob_start();
include("../config/db.php");

$form_data = json_decode(file_get_contents("php://input"));
$query = $form_data->query;
$output = array();

$Users = mysqli_query($conn,"SELECT * FROM users where username='$query'");
if($Users){
while($r = mysqli_fetch_array($Users)) {
    $output[] = $r;
}
}

echo json_encode($output);

?>