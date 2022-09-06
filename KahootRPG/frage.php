<?php

session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";
$data = [];

function connCheck($conne, $sqll) {
  if ($conne->query($sqll) === TRUE) {
    echo "New record created successfully";
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


$sql = "SELECT * FROM questions";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = mysqli_fetch_assoc($result)){
      $questions[] = $row;
}}

$sql = "SELECT * FROM answers";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = mysqli_fetch_assoc($result)){
      $anwsers[] = $row;
}}





?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css.css">
</head>
<body>
    <div id="main">
        <form action="frage_submit.php" method="post">
            <input name = "quest" value = "quest here"/> </br>
            <input name = "anwser1" value = "Option 1"/> <input type="checkbox" name = "correct1" value="true"/> <input type="hidden" name = "correct1" value="false"/> </br>
            <input name = "anwser2" value = "Option 2"/> <input type="checkbox" name = "correct2" value="true"/> <input type="hidden" name = "correct2" value="false"/> </br>
            <input name = "anwser3" value = "Option 3"/> <input type="checkbox" name = "correct3" value="true"/> <input type="hidden" name = "correct3" value="false"/> </br>
            <input name = "anwser4" value = "Option 4"/> <input type="checkbox" name = "correct4" value="true"/> <input type="hidden" name = "correct4" value="false"/> </br>

            <input type="submit" value="Submit"/>
        </form>
        <div>
            <?php 
            for($i = 0; $i < count($questions); $i++){
                echo '<h1>'.$questions[$i]["Question"].'</h1></br>';
                for($x = 0; $x < count($anwsers); $x++){
                    if($questions[$i]["qID"] == $anwsers[$x]["qID"]){
                        echo $anwsers[$x]["Answer"].'</br>';
                    }
                }
                echo '<input type="submit" value="Delete"/>';
            }
            
            
            ?>


        </div>
    </div>
</body>
</html>