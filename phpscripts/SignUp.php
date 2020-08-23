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
$FB = $form_data->FB;
$INSTA = $form_data->INSTA;
$TWITTER = $form_data->TWITTER;

if(strlen($name) < 2 && strlen($name) > 25) {
    $error = "Name length greater than limit value";
}

if(strlen($password) < 2 && strlen($password) > 25) {
    $error = "Passowrd length greater than limit value";
}

 if($form_data->action == 'insert' && !empty($username) && !empty($email) && !empty($password) && !empty($FB) && !empty($INSTA) && !empty($TWITTER) && $error=="")
 {
    $existingUser = mysqli_query($conn,"SELECT * FROM users WHERE email='$email'");
    if(mysqli_num_rows($existingUser) == 0) {
        $hash = md5($password);
        $createUser = "INSERT INTO users(username,password,email,FB,INSTA,TWITTER) VALUES('$username','$hash','$email','$FB','$INSTA','$TWITTER')";
        mysqli_query($conn, $createUser);
        $_SESSION['email'] = $email;
        $_SESSION['username'] = $username;
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
