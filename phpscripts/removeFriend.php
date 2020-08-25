<?php
session_start();
ob_start();
include("../config/db.php");

$form_data = json_decode(file_get_contents("php://input"));
$id = $form_data->userId;
$checkId = $form_data->id;
$output = array();

mysqli_query($conn, "DELETE FROM friends WHERE id1='$id' AND id2='$checkId' OR id1='$checkId' AND id2='$id'") ;

?>