<?php
include("../config.php");
include("../CORS.php");

$input = file_get_contents("php://input"); // reads the raw POST data from the HTTP request body into a string.
$data = json_decode($input, true);

$status = true; // to check condition

if (isset($data['name']) && isset($data['password']) && isset($data['email']) && isset($data['role'])) {

    // Corrected SQL query syntax for checking existing email
    $email = $data['email'];
    $query = mysqli_query($conn, "SELECT * FROM user WHERE email = '$email'");
    $existInDatabase = mysqli_num_rows($query);

    if ($existInDatabase > 0) {
        $response = array(
            'message' => "Email already exists"
        );
        echo json_encode($response, JSON_PRETTY_PRINT);
        return;
    } else {
        $name = $data['name'];
        $password = $data['password'];
        $role = $data['role'];
        
        // Corrected SQL query syntax for inserting a new user
        $query = mysqli_query($conn, 
            "INSERT INTO user (name, password, email, role) VALUES ('$name', '$password', '$email', '$role')");

        if ($query) {
            $status = true;
        } else {
            $status = false;
        }
    }
} else {
    $status = false;
}

$response = array(
    'message' => $status ? 'success' : 'error'
);

echo json_encode($response, JSON_PRETTY_PRINT);
?>
