<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500 ");
//header("Content-type: image/gif");
include("connection.php");
$done = false;


if (
  isset($_POST["user_id"])  && isset($_POST["full_name"])  && isset($_POST["password"]) && isset($_POST["birth_day"])
) {

  $user_id = $_POST["user_id"];
  $full_name = $_POST["full_name"];
  // $password = hash('sha256', $_POST["password"] );
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
  $birth_day = $_POST["birth_day"];
  $bio = "";
  $photo_path = "";

  if (isset($_POST["bio"])) {
    $bio = $_POST["bio"];
  }
  if (isset($_POST["profile_photo"])) {
    $fileName = $_POST["fileName"];
    $code64 = explode(',', $_POST["profile_photo"]);
    $img = base64_decode($code64[1]);
    $extension = explode(";", explode('/', $code64[0])[1])[0];
    $photo_path = "profile_photos/" . uniqid() . "." . $extension;
    file_put_contents($photo_path, $img);
  }

  $query = $mysqli->prepare("UPDATE users Set full_name=? , password=? ,  birth_day=? , bio=? ,profile_photo=?
  where user_id=?	");
  $query->bind_param("sssssi", $full_name, $password, $birth_day, $bio, $photo_path, $user_id);

  if ($query->execute()) {
    $done = true;
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
