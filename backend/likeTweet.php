<?php
include("connection.php");
$done = false;


if (
  isset($_POST["user_id"])  && isset($_POST["tweet_id"])
) {
  $user_id = $_POST["user_id"];
  $tweet_id = $_POST["tweet_id"];

  $query = $mysqli->prepare("SELECT * from  liked_tweets where user_id=? and tweet_id=? ");
  $query->bind_param("ii",  $user_id, $tweet_id);
  if ($query->execute()) {
    $array = $query->get_result();
    $row = $array->fetch_assoc();

    if ($row == null) {
      $query = $mysqli->prepare("INSERT into liked_tweets (user_id,tweet_id) VALUES(?,?) ");
      $query->bind_param("ii",  $user_id, $tweet_id);

      if ($query->execute()) {
        $done = true;
      }  
    }
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
