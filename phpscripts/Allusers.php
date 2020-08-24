<?php 
    session_start();
    ob_start();
    include("../config/db.php");
?>
<?php
$form_data = json_decode(file_get_contents("php://input"));
$query = $form_data->query;
$id = $_SESSION['user'][0];
if($query == '') {
    $Users = mysqli_query($conn,"SELECT * FROM users where id!='$id'");
    $rows = array();
    if($Users){
    while($r = mysqli_fetch_array($Users)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
    }
}
?>