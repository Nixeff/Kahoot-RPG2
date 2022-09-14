<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";
$data = [];

if(isset($_SESSION['uname'])){
    $uname = $_SESSION['uname']; 
}


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(!isset($_SESSION["loggedIn"]) || isset($_POST["loggedIn"])){
    session_destroy();
    session_start();
    $_SESSION["loggedIn"] = false;
}
   


if (isset($_POST["uname"]) && isset($_POST["pass"])){
    $uname = $_POST["uname"];
    $pass = $_POST["pass"];


    // finns det ett username och är lösenordet rätt?
    $sql = "SELECT * FROM students WHERE Name = '$uname' AND Password = '$pass' ";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION["loggedIn"] = true;
        $_SESSION['uname'] = $uname; 
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
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"/>

<link rel="stylesheet" href="css.css">
<body>
    <div id="main">
        <div>
            <canvas id="canvas" width="1000"  height="300"></canvas>
            <div id="anwserarea">
                <?php
                if($_SESSION["loggedIn"]){
                    echo '<button class="anwserbutton" id="1" type="button" onclick="anwser(this);">1</button>
                    <button class="anwserbutton" id="2" type="button" onclick="anwser(this);">2</button></br>
                    <button class="anwserbutton" id="3" type="button" onclick="anwser(this);">3</button>
                    <button class="anwserbutton" id="4" type="button" onclick="anwser(this);">4</button>';
                }
                
                ?>
            </div>
        </div>
        <div id="menu">
            <?php 
            if(!$_SESSION["loggedIn"]){
                
                echo '<form id="logIn" action="" method="POST"><p>Sign in!</p><input name="uname" placeholder="Username" autofocus/> </br><input name="pass" placeholder="Password" type="password"/> </br><input type="submit" value="Log in" /></form>';
            } else {
                $uname = $_SESSION['uname']; 
                echo '<p>Welcome '.$uname.'</p>';
                echo '<form action="" method="POST">
                    <input type="hidden" name="loggedIn" value=false/>
                    <input type="submit" value="Log out"/>
                </form>';

                echo '<form id="inventoryItem">
                <p id="inventoryText"> Meat</p>
                <p id="inventoryText"> Heal 2 HP</p>
                <div id="main">
                    <input id="use" type="submit" value="Use Item"/>
                    <input type="submit" value="Discard"/>
                </div>
                </form>';
            }
            ?>
            

        </div>
    </div>
</body >
<script src="script.js"></script>
</html>