<?php 
session_start();
ob_start();
include("../config/db.php");

$form_data = json_decode(file_get_contents("php://input"));
$id = $_SESSION['user'][0];
$otherId = $form_data->id;
$output = array();

$Messages = mysqli_query($conn,"SELECT * FROM messages where user_to='$id' AND user_from='$otherId' OR user_from='$id' AND user_to='$otherId'");
while($message = mysqli_fetch_Array($Messages)) {
    $output[] = $message;
}

echo json_encode($output);

?>