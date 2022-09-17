//  tags
const tweets_btn = document.getElementById("tweets_btn");
const media_btn = document.getElementById("media_btn");
const likes_btn = document.getElementById("liked_btn");
//container tweet
const usertweet = document.getElementById("tweet");
const liked_tweet = document.getElementById("liked_tweet");
const media_tweet = document.getElementById("media_tweet");
const edit_container = document.getElementById("edit_container");
const overlay = document.getElementById("overlay");
const close_edit_profile = document.getElementById("close");
const edit_profile = document.getElementById("edit_profile");
const body = document.getElementById("body");
const currentUserFullName = document.querySelectorAll(".currentUserFullName");
const userName = document.querySelectorAll(".currentUserName ");
const joinDate = document.querySelector("#joinDate ");
const bannerProfilePhoto = document.querySelectorAll(".profilePhoto-big ");
const userProfilePhoto = document.querySelectorAll(".userProfilePhoto ");
const following_nb = document.querySelector("#following-nb ");
//edit profile
const bio = document.querySelector("#bio ");
const bio_input = document.querySelector("#bio_input ");
const year = document.querySelector("#year ");
const day = document.querySelector("#day");
const month = document.querySelector("#month ");
const fullName = document.querySelector("#fullName");
const btn_save = document.querySelector("#btn-save");
const img_upload_banner = document.querySelector("#img-upload-big");
const img_upload_photo = document.querySelector("#img-upload-small");

const user_id = 11;

// api
const userInfoApi = "http://localhost:3000/getUserInfo.php";
const editProfileApi = "http://localhost:3000/editprofile.php";
const getfollowingApi = "http://localhost:3000/getfollowing.php";

// edit profile
edit_profile.addEventListener("click", () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  overlay.classList.remove("d-none");
  edit_container.classList.remove("d-none");
  body.classList.add("overflow-n");
});

close_edit_profile.addEventListener("click", () => {
  overlay.classList.add("d-none");
  edit_container.classList.add("d-none");
  body.classList.remove("overflow-n");
});

// for bar of 3 btn
tweets_btn.addEventListener("click", () => {
  // remove active class and put reomve from screen
  removeActiveClass();
  tweets_btn.classList.add("active");
  usertweet.classList.remove("d-none");
});

media_btn.addEventListener("click", () => {
  // remove active class and put reomve from screen
  removeActiveClass();
  media_btn.classList.add("active");
  media_tweet.classList.remove("d-none");
});

likes_btn.addEventListener("click", () => {
  // remove active class and put reomve from screen
  removeActiveClass();
  likes_btn.classList.add("active");
  liked_tweet.classList.remove("d-none");
});

function removeActiveClass() {
  tweets_btn.classList.remove("active");
  media_btn.classList.remove("active");
  likes_btn.classList.remove("active");
  usertweet.classList.add("d-none");
  liked_tweet.classList.add("d-none");
  media_tweet.classList.add("d-none");
}

// print full name and user
const printName = (name, user_name) => {
  currentUserFullName.forEach((tag) => {
    tag.textContent = name;
  });
  userName.forEach((tag) => {
    tag.textContent = user_name;
  });
};

// put user img and banner
const profilePhoto = (img, banner) => {
  if (img != null && img != "") {
    userProfilePhoto.forEach((tag) => {
      tag.style.background = "url(http://localhost:3000/" + img + ")";
      tag.style.backgroundColor = "none";
      tag.style.backgroundSize = "cover";
      tag.style.backgroundRepeat = "no-repeat";
      tag.style.backgroundPosition = "center";
    });
  }

  if (banner != null && banner != "") {
    bannerProfilePhoto.forEach((tag) => {
      tag.style.background = "url(http://localhost:3000/" + banner + ")";
      tag.style.backgroundColor = "none";
      tag.style.backgroundSize = "cover";
      tag.style.backgroundRepeat = "no-repeat";
      tag.style.backgroundPosition = "center";
    });
  }
};

//for edit profile
const fillEditProfile = (name, bio, birth_day) => {
  fullName.value = name;
  bio_input.value = bio;
  let birth_day_arr = birth_day.split("-");
  year.value = birth_day_arr[2];
  day.value = birth_day_arr[0];
  month.value = birth_day_arr[1];
};

btn_save.addEventListener("click", (e) => {
  e.preventDefault();
  editProfile();
});

//edit profile post data to api
const reader = new FileReader();

let userNewData = new FormData();

//send img
img_upload_photo.addEventListener("change", () => {
  reader.addEventListener("load", () => {
    userNewData.append("profile_photo", reader.result);
    editProfile();
  });
  reader.readAsDataURL(img_upload_photo.files[0]);
});

//send banner img
img_upload_banner.addEventListener("change", () => {
  reader.addEventListener("load", () => {
    userNewData.append("profile_photo_banner", reader.result);
    editProfile();
  });
  reader.readAsDataURL(img_upload_banner.files[0]);
});

//send new info
const editProfile = () => {
  let Newbirth_day = day.value + "-" + month.value + "-" + year.value;
  userNewData.append("user_id", user_id);
  userNewData.append("full_name", fullName.value);
  userNewData.append("bio", bio_input.value);
  userNewData.append("birth_day", Newbirth_day);

  //now change img save pervious path
  if (img_upload_photo.files.length == 0) {
    let path_photo = userProfilePhoto[0].style.backgroundImage;
    if (path_photo != "") {
      path_photo = userProfilePhoto[0].style.backgroundImage.split("/");
      path_photo = path_photo[3] + "/" + path_photo[4].slice(0, -2);
      userNewData.append("current_profile_photo", path_photo);
    }
  }

  //same for banner
  if (img_upload_banner.files.length == 0) {
    let path_banner = bannerProfilePhoto[0].style.backgroundImage;
    if (path_banner != "") {
      path_banner = bannerProfilePhoto[0].style.backgroundImage.split("/");
      path_banner = path_banner[3] + "/" + path_banner[4].slice(0, -2);
      userNewData.append("current_profile_photo_banner", path_banner);
    }
  }
  sendNewInfo();
};

const sendNewInfo = () => {
  fetch(editProfileApi, {
    method: "POST",
    body: userNewData,
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        if (data.done) {
          location.reload();
        }
      });
    }
  });
};
//end edit profile

// get user info
//to sent the post data in body
let userInfoData = new FormData();
userInfoData.append("user_id", user_id);
fetch(userInfoApi, {
  method: "POST",
  body: userInfoData,
}).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      if (data.done) {
        data = data.userInfo;
        printName(data.full_name, data.user_name);
        joinDate.textContent = data.join_date;
        profilePhoto(data.profile_photo, data.profile_photo_banner);
        bio.textContent = data.bio;
        fillEditProfile(data.full_name, data.bio, data.birth_day);
        console.log(data);
      }
    });
  }
});

//getfollowing
fetch(getfollowingApi, {
  method: "POST",
  body: userInfoData,
}).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      if (data.done) {
        following_nb.textContent = data.number_of_following.count_following;
      }
    });
  }
});