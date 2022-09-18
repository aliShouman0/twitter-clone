<?php
include("connection.php");
$done = false;
$row = [];

if (
  isset($_POST["user_id"])
) {
  $user_id = $_POST["user_id"];

  $query = $mysqli->prepare("select count(user_id) as count_follower from follows where follow_user_id=?  ");
  $query->bind_param("i", $user_id);

  if ($query->execute()) {

    $array = $query->get_result();
    $row = $array->fetch_assoc()["count_follower"];
    $done = true;
  } 
  
}

$result = [
  "done" => $done,
  'number_of_follower' => $row
];
echo json_encode($result);
