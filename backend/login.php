<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
$done=false;

include("connection.php");

if (
    isset($_POST["email"])  && isset($_POST["password"])
  ) {
    $email = $_POST["email"];
    $password =  $_POST["password"];
    //$password = hash('sha256', $_POST["password"]);
    $query = $mysqli->prepare("select user_id,password from users where email=?  ");
    $query->bind_param("s", $email);
  
    if ($query->execute()) {
  
      $array = $query->get_result();
      $row = $array->fetch_assoc();
      if (password_verify($password, $row["password"])) {
        $done = true;
      }
    } else {
      echo  $mysqli->error;
    }
  }
  
  $result = [
    "done" => $done,
    'email' => $email,
    'id' => $row["user_id"],
  ];
  echo json_encode($result);