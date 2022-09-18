<?php
include("connection.php");
$done = false;

if (
  isset($_POST["user_name"]) && isset($_POST["tweet_text"])
  && isset($_POST["user_id"])
) {

  $user_name = $_POST["user_name"];
  $tweet_text = $_POST["tweet_text"];
  $photo_path = "";
  if (isset($_POST["tweet_photo"])) {
    $tweet_photo = $_POST["tweet_photo"];
    $code64 = explode(',', $_POST["tweet_photo"]);
    $img = base64_decode($code64[1]);
    $extension = explode(";", explode('/', $code64[0])[1])[0];
    $photo_path = "postphoto/" . uniqid() . "." . $extension;
    file_put_contents($photo_path, $img);
  }
  $user_id = $_POST["user_id"];
  $tweet_date = date('d-m-Y');

  $query = $mysqli->prepare("INSERT INTO tweets (user_name,tweet_date,tweet_text,tweet_photo,user_id) 
        VALUES(?,?,?,?,?)");
  $query->bind_param("ssssi", $user_name, $tweet_date, $tweet_text, $photo_path, $user_id);
  if ($query->execute()) {
    $done = true;
  }
}



$result = [
  "done" => $done,
];

echo json_encode($result);
