<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500 ");
include("connection.php");
$done = false;


if (
  isset($_POST["email"])  && isset($_POST["password"])
) {
  $email = $_POST["email"];
  $password =  $_POST["password"];
  //$password = hash('sha256', $_POST["password"]);
  $query = $mysqli->prepare("select password from users where email=?  ");
  $query->bind_param("s", $email);

  if ($query->execute()) {

    $array = $query->get_result();
    $row = $array->fetch_assoc();
    if (password_verify($password, $row["password"])) {
      $done = true;
    }
  } else {
    echo  $mysqli->error;
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
