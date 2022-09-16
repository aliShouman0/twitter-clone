<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500 ");
include("connection.php");
$done = false;


if (
  isset($_POST["user_id"])  && isset($_POST["full_name"])  && isset($_POST["password"]) && isset($_POST["birth_day"])
) {

  $user_id = $_POST["user_id"];
  $full_name = $_POST["full_name"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
  $birth_day = $_POST["birth_day"];
  $bio = "";
  //we must insert data as data type in db
  //$birth_day = "STR_TO_DATE('$birthday', '%d-%m-%Y')";
  if (isset($_POST["bio"])) {
    $bio = $_POST["bio"];
  }

  $query = $mysqli->prepare("UPDATE users Set full_name=? , password=? ,  birth_day=? , bio=? 
  where user_id=?	");
  $query->bind_param("ssssi", $full_name,   $password, $birth_day, $bio, $user_id);

  if ($query->execute()) {
    $done = true;
  } else {
    echo mysqli_error($mysqli);
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
