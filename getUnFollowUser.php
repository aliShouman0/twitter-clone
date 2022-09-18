<?php
include("connection.php");
$done = false;
$userInfo = [];

if (
  isset($_POST["user_id"])
) {
  $user_id = $_POST["user_id"];
  $query = $mysqli->prepare("SELECT user_id	,full_name,	user_name	, email	,profile_photo,profile_photo_banner,	birth_day	,join_date,bio from users 
  where user_id not in (select follow_user_id from follows where user_id=? )and user_id!=? LIMIT 3	");
  $query->bind_param("ii", $user_id, $user_id);

  if ($query->execute()) {
    $data = $query->get_result(); 
    while ($row = $data->fetch_assoc()) {
      $userInfo[] = $row;
    }
    $done = true;
  }
}


$result = [
  "done" => $done,
  "userInfo" => $userInfo
];

echo json_encode($result);
