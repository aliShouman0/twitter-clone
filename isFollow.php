<?php
include("connection.php");
$done = false;
$isFollow = false;

if (
  isset($_POST["user_id"]) && isset($_POST["follow_user_id"])

) {
  $user_id = $_POST["user_id"];
  $follow_user_id = $_POST["follow_user_id"];

  $query = $mysqli->prepare("SELECT * from  follows where user_id =? and follow_user_id=?");
  $query->bind_param("ii", $user_id, $follow_user_id);

  if ($query->execute()) {
    $array = $query->get_result();
    $row = $array->fetch_assoc();
    if ($row= NULL) {
      $isFollow = true;
    }
    $done = true;
  }
}

$result = [
  "done" => $done,
  "isFollow" => $isFollow
];
echo json_encode($result);
