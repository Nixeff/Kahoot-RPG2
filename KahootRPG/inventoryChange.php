<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kahootrpg";

$uID = $_POST["uID"];
$itemID = $_POST["itemID"];


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

$sql = "SELECT * FROM inventory WHERE PlayerID = $uID AND itemID = $itemID";
$result = connCheck($conn, $sql);
if ($result->num_rows > 0) {
  while($row = mysqli_fetch_assoc($result)){
    
    $item = $row;
    $amount = $item["Amount"];
}}



if(!empty($_POST["use"])){
  if ($item["Amount"] >= 2){
    $sql = "UPDATE inventory SET Amount = $amount-1 WHERE PlayerID = $uID AND itemID = $itemID";
    $conn->query($sql);
    echo $itemID;
  }
  if ($item["Amount"] == 1){
    $sql = "DELETE FROM inventory WHERE PlayerID = $uID AND itemID = $itemID";
    $conn->query($sql);
    echo $itemID;
    $empty = "e";
    echo $empty;
  }
}else{
  if(isset($item)){
    echo "här";
    $sql = "UPDATE inventory SET Amount = $amount+1 WHERE PlayerID = $uID AND itemID = $itemID";
    $conn->query($sql);
  } else{
    echo "här med";
    $sql = "INSERT INTO inventory (PlayerID, itemID, Amount) VALUE ($uID, $itemID, 1)";
    $conn->query($sql);
  }
}

