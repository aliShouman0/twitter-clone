<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500 ");
//header("Content-type: image/gif");
include("connection.php");
$done = false;
$userInfo = [];

if (
  isset($_POST["user_id"])
) {
  $user_id = $_POST["user_id"];
  $query = $mysqli->prepare("SELECT user_id	,full_name,	user_name	, email	,profile_photo,	birth_day	,join_date,bio from users where user_id=?	");
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
