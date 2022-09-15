<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500 ");
include("connection.php");
$done = false;


if (
  isset($_POST["full_name"]) && isset($_POST["user_name"])
  && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["birth_day"])
) {

  $full_name = $_POST["full_name"];
  $user_name = $_POST["user_name"];
  $email = $_POST["email"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
  $birth_day = $_POST["birth_day"];
  //we must insert data as data type in db
  //$birth_day = "STR_TO_DATE('$birthday', '%d-%m-%Y')";
  $date = date('d-m-Y');
  //$join_date  = "STR_TO_DATE('$date', '%d-%m-%Y')";
  $join_date  = date('d-m-Y');

  $query = $mysqli->prepare("INSERT INTO users (full_name,user_name,email,password,birth_day,join_date) 
        VALUES(?,?,?,?,?,?)");
  $query->bind_param("ssssss", $full_name, $user_name, $email, $password, $birth_day, $join_date);

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
