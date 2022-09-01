<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";

$data = array();

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


$sql = "SELECT * FROM anwsers";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $anwsersList = $result->fetch_assoc();
} else {
  echo "0 results";
}

header('Content-Type: application/json');

echo json_encode($data);