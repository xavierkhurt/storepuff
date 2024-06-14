<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "users";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user input
$Email = $_POST['Email'];
$Password = $_POST['Password'];

// Check if the user exists in the database
$sql = "SELECT * FROM user_info WHERE Email='$Email' AND Password='$Password'";
$result = $conn->query($sql);
$row=mysqli_fetch_array($result);

if ($row["usertype"] == "user") {
    header('location:main_page.html');
} 
elseif ($row["usertype"] == "admin") {
    header('location:admin_page.html');
}
else
{
    echo "Invalid email or password.";
}

$conn->close();
?>