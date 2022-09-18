<?php
//connection file
header("Access-Control-Allow-Origin: * ");
$host = "localhost";
$db_user = "matic";
$db_pass = "1030/12";
$db_name = "twitterdb";

$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);
