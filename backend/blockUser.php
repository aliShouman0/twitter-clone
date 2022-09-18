<?php
//header("Content-type: image/gif");
include("connection.php");
$done = false;


if (
  isset($_POST["user_id"])  && isset($_POST["bloked_user_id"])
) {
  $user_id = $_POST["user_id"];
  $bloked_user_id = $_POST["bloked_user_id"];

  $query = $mysqli->prepare("INSERT into blocked_users (user_id,bloked_user_id) VALUES(?,?)
    ");
  $query->bind_param("ii",  $user_id, $bloked_user_id);

  if ($query->execute()) {
    $done = true;
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
