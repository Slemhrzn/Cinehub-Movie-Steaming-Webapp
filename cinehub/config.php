<?php
$hostName="localhost"; // Machine on which MySQL Database is running
$userName="root" ;             // Database User Login
$password="" ;             // Database User Password
$databaseName = "cinehub" ;       // Database name
$conn=@mysqli_connect($hostName, $userName, $password);
if(!isset($conn))
die("Database connection error!");
mysqli_select_db($conn,$databaseName);
mysqli_query($conn,"SET NAMES 'utf8'");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,DELETE,PUT,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
?>
