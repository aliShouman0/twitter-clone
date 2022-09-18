<?php
//header("Content-type: image/gif");
header("Access-Control-Allow-Origin: * ");
include("connection.php");
$done = false;
$userInfo = [];

if (
  isset($_POST["user_id"])
) {
  $user_id = $_POST["user_id"];
  $query = $mysqli->prepare("SELECT user_id	,full_name,	user_name	, email	,profile_photo,profile_photo_banner,	birth_day	,join_date,bio from users where user_id=?	");
  $query->bind_param("s", $user_id);

  if ($query->execute()) {
    $data = $query->get_result();
    $userInfo = $data->fetch_assoc();
    $done = true;
  }
}


$result = [
  "done" => $done,
  "userInfo" => $userInfo
];

echo json_encode($result);
