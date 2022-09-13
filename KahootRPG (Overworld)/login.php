<?php 
session_start();
$user = "";
$pass = "";

//Ska användas för att sätta tillbaka det man skrivit i sinna platser
if(isset($_SESSION['uname'])){
    $user = $_SESSION['uname'];
}
if(isset($_SESSION['pass'])){
    $pass = $_SESSION['pass'];
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="login_check.php" method="post">
        <input name="uname" placeholder="Username" value=<?php echo $user ?> autofocus/> </br>
        <input name="pass" placeholder="Password" type="password" value=<?php echo $pass ?>/> </br>
        <input type="submit" value="Log in" />
    </form>
</body>
</html>