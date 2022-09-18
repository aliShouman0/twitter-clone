<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

include("connection.php");
$done = false;
$users=array();

if (
  isset($_POST["full_name"])
) {
  $full_name = $_POST["full_name"];
  $query = $mysqli->prepare("SELECT * from users where full_name=?	");
  $query->bind_param("s", $full_name);

  if ($query->execute()){
    $array = $query->get_result();
    while($row=$array->fetch_array()){
        $users[]=$row;
    }

    

    echo json_encode($users);
}
}