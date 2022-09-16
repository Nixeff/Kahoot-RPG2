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
if(isset($_SESSION['uID'])){
    $uID = $_SESSION['uID']; 
}

function connCheck($conne, $sqll) {
    if ($conne->query($sqll) == TRUE) {
        $result = $conne->query($sqll);
        return $result;
    } else {
        echo "Error: " . $sqll . "<br>" . $conne->error;
    }
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

//---------------------------------------------------------------------------------------------------------------
//          LOGIN
//---------------------------------------------------------------------------------------------------------------

if (!empty($_POST["uname"]) && !empty($_POST["pass"])){
    $uname = $_POST["uname"];
    $pass = $_POST["pass"];

    // finns det ett username och är lösenordet rätt?
    $sql = "SELECT * FROM students WHERE Name = '$uname' AND Password = '$pass' ";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = mysqli_fetch_assoc($result)){
            $_SESSION["uID"] = $row["ID"];
        }
        $_SESSION["loggedIn"] = true;
        $_SESSION['uname'] = $uname; 
    } else {
    // finns det ett username och är lösenordet rätt?
        $sql = "SELECT * FROM teacher WHERE Name = '$uname' AND Password = '$pass'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            header('Location: '.'frage.php');
            die();
        } else {
            echo "<script>alert('We could not find your account you might have writen the wrong username or password try again')</script>" ;
        }
}}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<script  src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"> </script>

<link rel="stylesheet" href="css.css">
<body>
    <div id="main">
        <div>
            <canvas id="canvas" width="1000"  height="300"></canvas>
            <div id="anwserarea">
                <?php
                if($_SESSION["loggedIn"]){
                    echo '<button class="anwserbutton" id="a1" type="button" onclick="anwser(this);">1</button>
                    <button class="anwserbutton" id="a2" type="button" onclick="anwser(this);">2</button></br>
                    <button class="anwserbutton" id="a3" type="button" onclick="anwser(this);">3</button>
                    <button class="anwserbutton" id="a4" type="button" onclick="anwser(this);">4</button>';
                }
                
                ?>
            </div>
        </div>
        <div id="menu">
            <?php 
            //---------------------------------------------------------------------------------------------------------------
            //                  SKAPA ELEMENT
            //---------------------------------------------------------------------------------------------------------------
            
            //om du inte har loggat in skapar den inlogings grejen
            if(!$_SESSION["loggedIn"]){
                
                echo '<form id="logIn" action="" method="POST"><p>Sign in!</p><input name="uname" placeholder="Username" autofocus/> </br><input name="pass" placeholder="Password" type="password"/> </br><input type="submit" value="Log in" /></form>';
            } else {
                //Har du loggat in så skapar den ditt inventory
                $uname = $_SESSION['uname']; 
                $uID = $_SESSION['uID'];
                echo '<input id="jsUID" type="hidden" name="uID" value="'.$uID.'"';
                echo '<p>Welcome '.$uname.'</p>';
                echo '<form action="" method="POST">
                    <input type="hidden" name="loggedIn" value=false/>
                    <input type="submit" value="Log out"/>
                </form>';
                if($_SESSION["loggedIn"]){
                    $sql = "SELECT * FROM inventory WHERE PlayerID = $uID";
                    $result = connCheck($conn, $sql);
                    if ($result->num_rows > 0) {
                    while($row = mysqli_fetch_assoc($result)){
                        $inv[] = $row;
                    }}
                    if(!empty($inv)){
                        for($i = 0; $i<count($inv); $i++){
                            $button = " ";
                            $iID = $inv[$i]["itemID"];
                            if($inv[$i]["Amount"]>0){
                                $button = '<input id="button'.$iID.'" type="button" value="Use Item" onclick="updateUseItem(this)"/>';
                            }
                            
                            echo '<form id='.$inv[$i]["itemID"].' class="inventoryItem">
                            <input type="hidden" id="uID" name="uID" value="'.$uID.'"/>
                            <input type="hidden" id="itemID" name="itemID" value="'.$inv[$i]["itemID"].'"/>
                            <div id="main"> 
                                <p class="inventoryText" id="title'.$inv[$i]["itemID"].'"> Meat</p>
                                <p class="inventoryText" id="amount'.$inv[$i]["itemID"].'">x'.$inv[$i]["Amount"].'</p>
                            </div>
                            <p class="inventoryText" id="desc'.$inv[$i]["itemID"].'"> Heal 2 HP</p>
                            '.$button.'
                            </form>';
                        }
                    }
                }
            }
            ?>
            
        </div>
    </div>
</body >
<script src="script.js"></script>
</html>