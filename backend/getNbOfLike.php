<?php
include("connection.php");
$done = false;
$like = [];

if (
  isset($_POST["tweet_id"])
) {
  $tweet_id = $_POST["tweet_id"];
  $query = $mysqli->prepare("SELECT count(user_id) as 'like' from liked_tweets  where  tweet_id=?");

  $query->bind_param("i", $tweet_id);

  if ($query->execute()) {
    $data = $query->get_result();
    $like  = $data->fetch_assoc()["like"];
    $done = true;
  }
}


$result = [
  "done" => $done,
  "like" => $like
];

echo json_encode($result);
