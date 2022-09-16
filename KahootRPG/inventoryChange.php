<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";

$uID = $_POST["uID"];
$itemID = $_POST["itemID"];
$itemID = (int)$itemID;


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
//Letar efter itemet och lägger det i $item för att användas när man lägger in det i databasen
$sql = "SELECT * FROM inventory WHERE PlayerID = $uID AND itemID = $itemID";
$result = connCheck($conn, $sql);
if ($result->num_rows > 0) {
  while($row = mysqli_fetch_assoc($result)){
    
    $item = $row;
    $amount = $item["Amount"];
}}



if(!empty($_POST["use"])){
    $sql = "UPDATE inventory SET Amount = $amount-1 WHERE PlayerID = $uID AND itemID = $itemID";
    $conn->query($sql);
    echo json_encode($data = [
      $itemID, $amount
    ]);
}else{
    $sql = "UPDATE inventory SET Amount = $amount+1 WHERE PlayerID = $uID AND itemID = $itemID";
    $conn->query($sql);
    echo json_encode($data = [
      $itemID, $amount
    ]);
}

