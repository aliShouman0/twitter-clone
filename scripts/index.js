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
const user_id = 11;

// api
const userInfoApi = "http://localhost:3000/getUserInfo.php";

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
        console.log(data);
      }
    });
  }
});

// print full name
const printName = (name, user_name) => {
  currentUserFullName.forEach((tag) => {
    tag.textContent = name;
  });
  userName.forEach((tag) => {
    tag.textContent = user_name;
  });
};

const profilePhoto = (img, banner) => {
  if (img != null && img != "") {
    userProfilePhoto.forEach((tag) => {
      tag.style.background = "url(http://localhost:3000/" + img + ")";
      tag.style.backgroundColor = "none";
      tag.style.backgroundSize="cover";
      tag.style.backgroundRepeat="no-repeat";
      tag.style.backgroundPosition="center"; 

    });
  }
  if (banner != null && banner != "") {
    bannerProfilePhoto.forEach((tag) => {
      tag.style.background = "url(http://localhost:3000/" + banner + ")";
      tag.style.backgroundColor = "none";
      tag.style.backgroundSize="cover";
      tag.style.backgroundRepeat="no-repeat";
      tag.style.backgroundPosition="center"; 

    });
  }
};
