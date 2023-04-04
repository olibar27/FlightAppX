<?php
// Get the cell value from the AJAX POST request
$cellValue = $_POST['cellvalue'];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "xlsxtest";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Insert the cell value into the database
$sql = "INSERT INTO mytable (cellvalue) VALUES ('" . $cellValue . "')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>