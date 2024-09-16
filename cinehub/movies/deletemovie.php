<?php
include("../CORS.php");
include("../config.php");
header("Content-Type: application/json");

$success = false;
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = mysqli_real_escape_string($conn, $_GET['id']);
    $query = mysqli_query($conn, "DELETE FROM movie WHERE id='$id'");

    if ($query && mysqli_affected_rows($conn) > 0) {
        $success = true;
    }
}

$json = array(
    'status' => $success
);

echo json_encode($json, JSON_PRETTY_PRINT);
?>
