<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";
$data = [];

$uname = $_POST['uname']; 
$pass = $_POST['pass'];


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


$sql = "SELECT * FROM teacher WHERE Name = '$uname' AND Password = '$pass' ";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "welcome $uname";
  header('Location: '.'frage.php');
  die();
} else {
  echo "We could not find your account you might have writen the wrong username or password try again";
}