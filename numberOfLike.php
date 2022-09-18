<?php
include("connection.php");

$done=false;

if (
    isset($_POST["tweet_id"])
  ) {
    $tweet_id = $_POST["tweet_id"];
    
    $query = $mysqli->prepare("select count(user_id) as count_like from liked_tweets where tweet_id=?  ");
    $query->bind_param("i", $tweet_id);
  
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
    'number_of_likes' => $row['count_like']
  ];
  echo json_encode($result);