<?php
include("connection.php");
$done = false;

if (
  isset($_POST["user_id"]) && isset($_POST["follow_user_id"])

) {
  $user_id = $_POST["user_id"];
  $follow_user_id = $_POST["follow_user_id"];

  $query = $mysqli->prepare("DELETE from follows where user_id =? and follow_user_id=?");
  $query->bind_param("ii", $user_id, $follow_user_id);

  if ($query->execute()) {
    $done = true;
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
