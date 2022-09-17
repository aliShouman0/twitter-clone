<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
$done=false;

include("connection.php");

if (
    isset($_POST["user_id"])
  ) {
    $user_id = $_POST["user_id"];
    
    $query = $mysqli->prepare("select count(user_id) as count_tweet from tweets where user_id=?  ");
    $query->bind_param("i", $user_id);
  
    if ($query->execute()) {
        
        $array = $query->get_result();
        $row = $array->fetch_assoc();
        $done = true;
    } else {
      echo  $mysqli->error;
    }
}
  
  $result = [
    "done" => $done,
    'number_of_tweets' => $row['count_tweet']
  ];
  echo json_encode($result);