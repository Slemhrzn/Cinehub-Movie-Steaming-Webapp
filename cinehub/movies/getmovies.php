<?php
include("../config.php");
include("../CORS.php");


$query = mysqli_query($conn,"SELECT * FROM movie");
if(isset($query)){
	$success = true;
}else{
	$success =false;
}
$total_rows = mysqli_num_rows($query);
if($total_rows>0){
	while($row=mysqli_fetch_array($query)){
		$json[]=array(
		'id' =>$row['id'],
		'name'=> $row['name'],
		'description' => $row['description'],
		'url' => $row['url'],
		'image'	=> $row['image'],
		'duration'=> $row['duration'],
		'releasedate'=>$row['releasedate'],
		'genre'=>$row['genre'],
		
		);
	}
}

echo json_encode($json,JSON_PRETTY_PRINT);


?>