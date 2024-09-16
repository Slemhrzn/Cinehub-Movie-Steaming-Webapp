<?php

include("../config.php");
include("../CORS.php");

$json = array();
$status = true;
$rowcount = 0;

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = $_GET['id'];
    $query = mysqli_query($conn, "SELECT * FROM movie WHERE id='$id'");
    if ($query) {
        $rowcount = mysqli_num_rows($query);
        if ($rowcount > 0) {
            $row = mysqli_fetch_array($query);
            $json = array(
                'id' => $row["id"],
                'name' => $row["name"],
                'description' => $row["description"],
                'url' => $row['url'],
                'image' => $row['image'],
                'genre' => $row['genre'],
                'duration'=>$row['duration'],
                'releasedate'=>$row['releasedate']
            );
        } else {
            $status = false;
        }
    } else {
        $status = false;
    }
} else {
    $status = false;
}

$response = array(
    'message' => $status == true ? $json : 'not found'
);

echo json_encode($response, JSON_PRETTY_PRINT);

?>
