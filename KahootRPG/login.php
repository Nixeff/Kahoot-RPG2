<?php
session_start();




?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <form action="login_submit.php" method="post">
        <input name = "quest" value = "quest here"/> </br>
        <input name = "anwser1" value = "Option 1"/> <input type="checkbox" name = "correct1" value="true"/> <input type="hidden" name = "correct1" value="false"/> </br>
        <input name = "anwser2" value = "Option 2"/> <input type="checkbox" name = "correct2" value="true"/> <input type="hidden" name = "correct2" value="false"/> </br>
        <input name = "anwser3" value = "Option 3"/> <input type="checkbox" name = "correct3" value="true"/> <input type="hidden" name = "correct3" value="false"/> </br>
        <input name = "anwser4" value = "Option 4"/> <input type="checkbox" name = "correct4" value="true"/> <input type="hidden" name = "correct4" value="false"/> </br>

        <input type="submit" value="Submit"/>
    </form>
</body>
</html>