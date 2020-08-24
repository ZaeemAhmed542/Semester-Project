<?php
session_start();
ob_start();
include("../config/db.php");
?>

<?php 
$form_data = json_decode(file_get_contents("php://input"));
$id = $_SESSION['user'][0];
$checkId = $form_data->id;

mysqli_query($conn, "INSERT INTO connection(id1, id2) VALUES ('$id','$checkId')");

$output = array("isFriend" => TRUE);

json_encode($output);
?>