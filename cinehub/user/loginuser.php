<?php
include("../config.php");
include("../CORS.php");

$input=file_get_contents("php://input");
$data = json_decode($input, true);
$json;
$status=true;

if(isset($data['email']) && isset($data['password'])){
    $email = $data['email'];
    $password=$data['password'];

    $query= mysqli_query($conn,"
    SELECT * FROM user where email='$email' AND password='$password' 
    ");

    $result = mysqli_num_rows($query);
    if($result> 0){
        $status=true;
        $col =  mysqli_fetch_array($query);
        $json = array(
            'name' => $col["name"],
            'email' => $col["email"],
            'role' => $col["role"],
        );
    }else{
        $status=false;
    }

}else {
    $status=false;
}
  $response = array(
    'message' => $status == true  ? $json: 'invalid email or password');

echo json_encode($response, JSON_PRETTY_PRINT);
    
?>