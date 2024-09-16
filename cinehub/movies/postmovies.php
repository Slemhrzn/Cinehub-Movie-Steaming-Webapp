<?php

include("../config.php");
include("../CORS.php");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$success = true;

if (isset($data['name'])) {
    $name = $data['name'];
    $description = $data['description'];
    $url = $data['url'];
    $image = $data['image'];
    $genre = json_encode($data['genre']); 
    $duration= $data['duration'];
    $releasedate= $data['releasedate'];
    

    $query = mysqli_query($conn, 
    "INSERT INTO movie SET name='$name',
        description='$description',
        url='$url',
        image='$image',
        genre ='$genre',
        duration='$duration',
        releasedate='$releasedate'
    ");
       
    if ($query) {
        $success = true;
    }else{
        $success = false;
    }
} else {
    $success = false;
}

$response = array('status' => $success ? 'success' : 'error');

echo json_encode($response, JSON_PRETTY_PRINT);

?>