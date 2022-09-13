<?php
session_start();
$RqID = $_POST["RqID"];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "hi";
echo $_POST["RqID"];
$sql = "DELETE FROM questions WHERE qID = '$RqID'";

$result = $conn->query($sql);

if(isset($result)){
    header('Location: '.'frage.php');
  die();
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
<body>
    
</body>
</html>