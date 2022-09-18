<?php
include("connection.php");
$done = false;
$row = [];

if (
  isset($_POST["user_id"])
) {
  $user_id = $_POST["user_id"];

  $query = $mysqli->prepare("select count(follow_user_id) as count_following from follows where user_id=?  ");
  $query->bind_param("i", $user_id);

  if ($query->execute()) {

    $array = $query->get_result();
    $row = $array->fetch_assoc()["count_following"];
    $done = true;
  }
}

$result = [
  "done" => $done,
  'number_of_following' => $row
];
echo json_encode($result);
