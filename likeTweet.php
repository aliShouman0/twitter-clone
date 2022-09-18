<?php
//header("Content-type: image/gif");
include("connection.php");
$done = false;


if (
  isset($_POST["user_id"])  && isset($_POST["tweet_id"])
) {
  $user_id = $_POST["user_id"];
  $tweet_id = $_POST["tweet_id"];
  $query = $mysqli->prepare("INSERT into liked_tweets (user_id,tweet_id) VALUES(?,?)
    ");
  $query->bind_param("ii",  $user_id, $tweet_id);

  if ($query->execute()) {
    $done = true;
  } else {
    echo $query->error;
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
