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
    $data[] = $row;
}}


//Sickar iväg frågorna
header('Content-Type: application/json');

echo json_encode($data);
?>