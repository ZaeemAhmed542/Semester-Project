<?php 
    session_start();
    ob_start();
    include("../config/db.php");
?>


<?php
$form_data = json_decode(file_get_contents("php://input"));
$error = '';

$email = $form_data->email;
$name = $form_data->name;
$password = $form_data->password;
$platform = $form_data->platform;
$handle = $form_data->handle;
$followers = $form_data->followers;
$follwing = $form_data->following;
$posts = $form_data->posts;
$profilepic = $form_data->profilepic;



if(strlen($name) < 2 && strlen($name) > 25) {
    $error = "Name length greater than limit value";
}

if(strlen($password) < 2 && strlen($password) > 25) {
    $error = "Passowrd length greater than limit value";
}

 if($form_data->action == 'insert' && !empty($username) && !empty($email) && !empty($password) && !empty($handle) && !empty($platform) && !empty($followers) && !empty($follwing) && !empty($posts) && $error=="")
 {
    $existingUser = mysqli_query($conn,"SELECT * FROM users WHERE email='$email'");
    if(mysqli_num_rows($existingUser) == 0) {
        $hash = md5($password);
        $createUser = "INSERT INTO users(username,password,email,handle,platform,followers,following,posts,profilepic) VALUES('$username','$hash','$email','$handle','$platform','$followers','$following','$posts','$profilepic')";
        mysqli_query($conn, $createUser);
        $_SESSION['user'] = $user;
    }
    else {
        $error = "email already exists";
    }
 }


 $output = array(
  'error'  => $error,
 );

echo json_encode($output);
?>
