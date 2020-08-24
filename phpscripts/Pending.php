<?php 
session_start();
ob_start();
include("../config/db.php");

$id = $_SESSION['user'][0];
$output = array();
$Users = mysqli_query($conn,"SELECT * FROM users where id!='$id'");
while($user = mysqli_fetch_Array($Users)) {
    $checkId = $user[0];
    $checkFriends = mysqli_query($conn,"SELECT * FROM connection WHERE id1='$id' AND id2='$checkId' OR id1='$checkId' AND id2='$id'");
    $count = mysqli_num_rows($checkFriends);
    if($count >= 1) {
        $output[] = $user;
    }
}

echo json_encode($output);

?>