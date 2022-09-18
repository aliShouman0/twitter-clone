<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

include("connection.php");
$done = false;

if (
  isset($_POST["user_id"])
) {
  $user = $_POST["user_id"];
  $query = $mysqli->prepare("SELECT * FROM tweets where user_id in (SELECT follow_user_id from follows where user_id=?)");
  $query->bind_param("i", $user);

  if ($query->execute()){
    $array = $query->get_result();

    $resonse=[];
    while($row=$array->fetch_array()){
        $response[]=$row;
    }
      
      echo json_encode($response);

}
}
