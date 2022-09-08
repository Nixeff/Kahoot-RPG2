<?php
session_start();
$test = $_POST["quest"];
$test1 = $_POST["anwser1"];
$test2 = $_POST["anwser2"];
$test3 = $_POST["anwser3"];
$test4 = $_POST["anwser4"];
if(isset($_POST["correct1"])){
  $cor1 = 1;
} else{
  $cor1 = 0;
}
if(isset($_POST["correct2"])){
  $cor2 = 1;
} else{
  $cor2 = 0;
}
if(isset($_POST["correct3"])){
  $cor3 = 1;
} else{
  $cor3 = 0;
}
if(isset($_POST["correct4"])){
  $cor4 = 1;
} else{
  $cor4 = 0;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";

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

$sql = "INSERT INTO questions (Question) VALUES ('$test')";

connCheck($conn, $sql);

$sql = "SELECT * FROM questions ORDER BY qID DESC LIMIT 1";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $qID = $row["qID"];
} else {
  echo "0 results";
}

$sql = "INSERT INTO answers (Answer, qID, Correct) VALUES ('$test1','$qID',$cor1)";

connCheck($conn, $sql);

$sql = "INSERT INTO answers (Answer, qID, Correct) VALUES ('$test2','$qID',$cor2)";

connCheck($conn, $sql);


$sql = "INSERT INTO answers (Answer, qID, Correct) VALUES ('$test3','$qID',$cor3)";

connCheck($conn, $sql);


$sql = "INSERT INTO answers (Answer, qID, Correct) VALUES ('$test4','$qID',$cor4)";

connCheck($conn, $sql);


$conn->close();


?>