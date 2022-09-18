<?php
//header("Content-type: image/gif");
include("connection.php");
$done = false;


if (
  isset($_POST["user_id"])  && isset($_POST["full_name"])  && isset($_POST["birth_day"])
) {

  $user_id = $_POST["user_id"];
  $full_name = $_POST["full_name"];
  $birth_day = $_POST["birth_day"];
  $bio = "";
  $photo_path = "";
  $profile_photo_banner_path = "";
  $sql = "UPDATE users Set full_name=? ,  birth_day=? , bio=? ,profile_photo=?
  , profile_photo_banner=?";

  if (isset($_POST["bio"])) {
    $bio = $_POST["bio"];
  }
  if (isset($_POST["profile_photo"])) {
    $code64 = explode(',', $_POST["profile_photo"]);
    $img = base64_decode($code64[1]);
    $extension = explode(";", explode('/', $code64[0])[1])[0];
    $photo_path = "profile_photos/" . uniqid() . "." . $extension;
    file_put_contents($photo_path, $img);
  } else {
    if (isset($_POST["current_profile_photo"])) {
      $photo_path = $_POST["current_profile_photo"];
    }
  }


  if (isset($_POST["profile_photo_banner"])) {
    $code64_banner = explode(',', $_POST["profile_photo_banner"]);
    $img_banner = base64_decode($code64_banner[1]);
    $extension_banner = explode(";", explode('/', $code64_banner[0])[1])[0];
    $profile_photo_banner_path = "profile_photos/" . uniqid() . "." . $extension_banner;
    file_put_contents($profile_photo_banner_path, $img_banner);
  } else {
    if (isset($_POST["current_profile_photo_banner"])) {
      $profile_photo_banner_path = $_POST["current_profile_photo_banner"];
    }
  }

  if (isset($_POST["password"])) {
    // $password = hash('sha256', $_POST["password"] );
    $sql = $sql . ",password=? where user_id=?	";
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $query = $mysqli->prepare($sql);
    $query->bind_param("ssssssi", $full_name,  $birth_day, $bio, $photo_path, $profile_photo_banner_path, $password, $user_id);
  } else {
    $sql = $sql . " where user_id=?	";
    $query = $mysqli->prepare($sql);
    $query->bind_param("sssssi", $full_name, $birth_day, $bio, $photo_path, $profile_photo_banner_path, $user_id);
  }


  if ($query->execute()) {
    $done = true;
  }
}

$result = [
  "done" => $done
];
echo json_encode($result);
