<?php
//header("Content-type: image/gif");
include("connection.php");
$done = false;
$tweets = [];

if (
  isset($_POST["user_id"])
) {
  $user_id = $_POST["user_id"];
  $query = $mysqli->prepare("SELECT * from tweets where user_id=?	");
  $query->bind_param("i", $user_id);

  if ($query->execute()) {
    $data = $query->get_result();
    while ($row = $data->fetch_assoc()) {
      $tweets[] = $row;
    }
    $done = true;
  }
}


$result = [
  "done" => $done,
  "tweets" => $tweets
];

echo json_encode($result);
