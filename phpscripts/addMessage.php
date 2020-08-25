<?php 
session_start();
ob_start();
include("../config/db.php");

$form_data = json_decode(file_get_contents("php://input"));
$user_from = $form_data->userId;
$user_to = $form_data->id;
$message = $form_data->message;
$output = array();

$insert = mysqli_query($conn,"INSERT INTO messages(user_from,user_to,message) VALUES('$user_from','$user_to','$message')");
$Messages = mysqli_query($conn,"SELECT * FROM messages where user_to='$user_from' AND user_from='$user_to' OR user_from='$user_from' AND user_to='$user_from'");
while($message = mysqli_fetch_Array($Messages)) {
    $output[] = $message;
}

echo json_encode($output);

?>