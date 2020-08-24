<?php 
    session_start();
    ob_start();
    include("../config/db.php");
?>

<?php
$form_data = json_decode(file_get_contents("php://input"));
$email = $form_data->email;
$password = $form_data->password;
$user = "";
$error = "";

 if(!empty($email) && !empty($password))
 {
    $User = mysqli_query($conn,"SELECT * FROM users WHERE email='$email'");
    if(mysqli_num_rows($User) != 0) {
        $user = mysqli_fetch_row($User);
        $hash = md5($password);
        if($user[2] == $hash) {
            $_SESSION['user'] = $user;
        }
        else {
            $user = NULL;
            $error = "wrong password";
        }
    }
    else {
        $error = "No user with this email";
    }
 }


 $output = array(
  'error'  => $error,
  'user' => $user,
 );

echo json_encode($output);
?>
