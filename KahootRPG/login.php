<?php 
session_start();

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
    <form action="login_check_teacher.php" method="post">
        <p>Login as GameMaster</p>
        <input name="uname" placeholder="Username" autofocus/> </br>
        <input name="pass" placeholder="Password" type="password"/> </br>
        <input type="submit" value="Log in" />
    </form>
    <form action="login_check_player.php" method="post">
        <p>Login as Player</p>
        <input name="uname" placeholder="Username" autofocus/> </br>
        <input name="pass" placeholder="Password" type="password"/> </br>
        <input type="submit" value="Log in" />
    </form>
</body>
</html>