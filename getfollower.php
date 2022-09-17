<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
$done=false;

include("connection.php");

if (
    isset($_POST["follow_user_id"])
  ) {
    $follow_user_id = $_POST["follow_user_id"];
    
    $query = $mysqli->prepare("select count(user_id) as count_follower from follows where follow_user_id=?  ");
    $query->bind_param("i", $follow_user_id);
  
    if ($query->execute()) {
        
        $array = $query->get_result();
        $row = $array->fetch_assoc();
        $done = true;
    } else {
      echo  $mysqli->error;
    }
}
  
  $result = [
    "done" => $done,
    'number_of_follower' => $row['count_follower']
  ];
  echo json_encode($result);