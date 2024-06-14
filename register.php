<?php
// Change these values according to your database configuration
$host = 'localhost';
$db = 'users'; // Update the database name here
$user = 'root';
$password = '';

// Establish a connection to the database
$connection = mysqli_connect($host, $user, $password, $db);

// Check if the connection was successful
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// Process the registration form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Firstname = $_POST['Firstname'];
    $Lastname = $_POST['Lastname'];
	$Email = $_POST['Email'];
    $Password = $_POST['Password'];

    // Create a query to insert the user into the database
    $query = "INSERT INTO user_info (Firstname, Lastname, Email, Password) VALUES ('$Firstname', '$Lastname', '$Email', '$Password')";

    // Execute the query
    if (mysqli_query($connection, $query)) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($connection);
    }
}

// Close the database connection
mysqli_close($connection);
?>