<?php 

session_start();

if(isset($_SESSION['user'])) {
    echo json_encode($_SESSION['user']);
}

else {
    $error = array("error" => "no user");
    echo json_encode($error);
}

?>