//  tags
const tweets_btn = document.getElementById("tweets_btn");
const media_btn = document.getElementById("media_btn");
const likes_btn = document.getElementById("liked_btn");
//container tweet
const usertweet = document.getElementById("tweet");
const liked_tweet = document.getElementById("liked_tweet");
const media_tweet = document.getElementById("media_tweet");
const body = document.getElementById("body");
const currentUserFullName = document.querySelectorAll(".currentUserFullName");
const userName = document.querySelectorAll(".currentUserName ");
const joinDate = document.querySelector("#joinDate ");
const bannerProfilePhoto = document.querySelectorAll(".profilePhoto-big ");
const userProfilePhoto = document.querySelectorAll(".userProfilePhoto ");
const following_nb = document.querySelector("#following-nb ");
const followers_nb = document.querySelector("#followers-nb ");
const numberOfTweet = document.querySelector("#numberOfTweet");
const unfollowUser_container = document.querySelector("#unfollowUser");
const loginUserFullName = document.querySelector("#loginUserFullName");
const loginProfilePhoto = document.querySelector("#loginProfilePhoto");
const logintUserName = document.querySelector("#logintUserName");

// api
const userInfoApi = "http://localhost:3000/getUserInfo.php";
const getfollowingApi = "http://localhost:3000/getfollowing.php";
const getFollowersApi = "http://localhost:3000/getfollower.php";
const numberOfTweetApi = "http://localhost:3000/numberOfTweet.php";
const getUnFollowUserApi = "http://localhost:3000/getUnFollowUser.php";
let login_user_id = 11;

let loginuersData = new FormData();
loginuersData.append("user_id", login_user_id);

// given url string
let url_str = document.URL;

let url = new URL(url_str);
let search_params = url.searchParams;

// get value of "id" parameter
const user_id = search_params.get("id");

//to sent the post data in body for get user info
let userInfoData = new FormData();
userInfoData.append("user_id", user_id);

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

// get the login user info
fetch(userInfoApi, {
  method: "POST",
  body: loginuersData,
}).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      if (data.done) {
        data = data.userInfo;
        loginUserFullName.textContent = data.full_name;
        logintUserName.textContent = data.user_name;
        if (data.profile_photo != "" && data.profile_photo != null) {
          loginProfilePhoto.style.background = "url(http://localhost:3000/" + data.profile_photo + ")";
          loginProfilePhoto.style.backgroundColor = "none";
          loginProfilePhoto.style.backgroundSize = "cover";
          loginProfilePhoto.style.backgroundRepeat = "no-repeat";
          loginProfilePhoto.style.backgroundPosition = "center";
        } 
      }
    });
  }
});

// get user info
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
        following_nb.textContent = data.number_of_following;
      }
    });
  }
});

//get Followers
fetch(getFollowersApi, {
  method: "POST",
  body: userInfoData,
}).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      if (data.done) {
        followers_nb.textContent = data.number_of_follower;
      }
    });
  }
});

//get numberOfTweet
fetch(numberOfTweetApi, {
  method: "POST",
  body: userInfoData,
}).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      if (data.done) {
        numberOfTweet.textContent = data.number_of_tweets;
      }
    });
  }
});

//get UnFollow User might like
fetch(getUnFollowUserApi, {
  method: "POST",
  body: userInfoData,
}).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      if (data.done) {
        data = data.userInfo;
        data.forEach((user) => {
          let might_like = document.createElement("div");
          might_like.classList.add("might-like");
          let img = document.createElement("div");
          let classesToAdd = ["otherUserPhoto", "samll", "xsmall"];
          img.classList.add(...classesToAdd);
          if (user.profile_photo != "" && user.profile_photo != null) {
            img.src = "http://localhost:3000/" + user.profile_photo + "";
            img.style.background = "none";
          }
          let div = document.createElement("div");
          let h4 = document.createElement("h4");
          h4.classList.add("fullName");
          h4.textContent = user.full_name;
          let span = document.createElement("span");
          span.classList.add("userName");
          span.textContent = user.user_name;
          let button = document.createElement("button");
          button.classList.add("btn-follow");
          button.textContent = "Follow";
          div.appendChild(span);
          div.appendChild(h4);
          might_like.appendChild(img);
          might_like.appendChild(div);
          might_like.appendChild(button);
          unfollowUser_container.appendChild(might_like);
        });
      }
    });
  }
});
