<?php
session_start();
ob_start();
include("../config/db.php");

$form_data = json_decode(file_get_contents("php://input"));
$id = $_SESSION['user'][0];
$checkId = $form_data->id;


mysqli_query($conn, "INSERT INTO friends(id1, id2) VALUES ('$id','$checkId')");
mysqli_query($conn, "DELETE FROM connection where id1='$id' AND id2='$checkId' OR id1='$checkId' AND id2='$id'");

$output = array("isFriend" => TRUE);

json_encode($output);
?>