<?php 
ob_start();
session_start();
include("../config/db.php");

$form_data = json_decode(file_get_contents("php://input"));
$id = $_SESSION['user'][0];
$checkId = $form_data->id;
$isFriend = FALSE;

$query = mysqli_query($conn,"SELECT * FROM friends where id1='$id' AND id2='$checkId' OR id1='$checkId' AND id2='$id'");
$count = mysqli_num_rows($query);
if($count >= 1) {
    $isFriend = TRUE;
}
else {
    $query = mysqli_query($conn,"SELECT * FROM connection where id1='$id' AND id2='$checkId' ");
    $count = mysqli_num_rows($query);
    if($count >= 1) {
        $isFriend = TRUE;
    }
    else {
        $isFriend = FALSE;
    }
}

$output = array(
    'isFriend' => $isFriend,
);
echo json_encode($output);
?>