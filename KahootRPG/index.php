<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";
$data = [];

$uname = $_SESSION['uname']; 
$pass = $_SESSION['pass'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(!isset($_SESSION["loggedIn"])){
    $_SESSION["loggedIn"] = false;
}
   


if (isset($_POST["uname"]) && isset($_POST["pass"])){


    // finns det ett username och är lösenordet rätt?
    $sql = "SELECT * FROM students WHERE Name = '$uname' AND Password = '$pass' ";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION["loggedIn"] = true;
    } else {
    // finns det ett username och är lösenordet rätt?
        $sql = "SELECT * FROM teacher WHERE Name = '$uname' AND Password = '$pass' ";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            header('Location: '.'frage.php');
            die();
        } else {
            echo "<script>alert('We could not find your account you might have writen the wrong username or password try again')</script>" ;
        }
}
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

<link rel="stylesheet" href="css.css">
<body>
    <div id="main">
        <div>
            <canvas id="canvas" width="1000"  height="300"></canvas>
            <div id="anwserarea">
                <button class="anwserbutton" id="1" type="button" onclick="anwser(this);">1</button>
                <button class="anwserbutton" id="2" type="button" onclick="anwser(this);">2</button></br>
                <button class="anwserbutton" id="3" type="button" onclick="anwser(this);">3</button>
                <button class="anwserbutton" id="4" type="button" onclick="anwser(this);">4</button>
            </div>
        </div>
        <div id="menu">
            <?php 
            if(!$_SESSION["loggedIn"]){
                
                echo '<form action="" method="POST"><input name="uname" placeholder="Username" autofocus/> </br><input name="pass" placeholder="Password" type="password"/> </br><input type="submit" value="Log in" /></form>';
            } else {
                $uname = $_SESSION['uname']; 
                echo '<p>Welcome '.$uname.'</p>';

                echo '<form id="questionList">
                <p>Test</p>
                <p> Description</p>
                <input type="submit" value="Submit"/>
                </form>';
            }
            ?>
            

        </div>
    </div>
</body >
<script src="script.js"></script>
</html>