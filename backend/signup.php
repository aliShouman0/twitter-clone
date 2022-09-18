<?php
 include("connection.php");
$done = false;

if (
  isset($_POST["full_name"]) && isset($_POST["user_name"])
  && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["birth_day"])
) {
  $full_name = $_POST["full_name"];
  $user_name = $_POST["user_name"];
  $email = $_POST["email"];
  //$password = hash('sha256', $_POST["password"]);
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
  $birth_day = $_POST["birth_day"];
  $date = date('d-m-Y');
  $join_date  = date('d-m-Y');

  $query = $mysqli->prepare("INSERT INTO users (full_name,user_name,email,password,birth_day,join_date) 
        VALUES(?,?,?,?,?,?)");
  $query->bind_param("ssssss", $full_name, $user_name, $email, $password, $birth_day, $join_date);

  if ($query->execute()) {
    $done = true;
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
