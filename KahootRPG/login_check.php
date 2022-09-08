<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";
$data = [];

$uname = $_POST['uname']; 
$pass = $_POST['pass'];
$_SESSION["uname"] = $_POST['uname']; 
$_SESSION["pass"] = $_POST['pass'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// finns det ett username och är lösenordet rätt?
$sql = "SELECT * FROM teacher WHERE Name = '$uname' AND Password = '$pass' ";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  header('Location: '.'frage.php');
  die();
} else {
  header('Location: '.'login.php');
  echo "We could not find your account you might have writen the wrong username or password try again";
  die();
}