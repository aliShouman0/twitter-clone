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
const joinDate = document.querySelector("#joinDate ");
const bannerProfilePhoto = document.querySelectorAll(".profilePhoto-big ");
const following_nb = document.querySelector("#following-nb ");
const followers_nb = document.querySelector("#followers-nb ");
const numberOfTweet = document.querySelector("#numberOfTweet");
const unfollowUser_container = document.querySelector("#unfollowUser");
const tweet_container = document.querySelector("#tweet");
const media_tweet_container = document.querySelector("#media_tweet");
const tweet_button = document.querySelector("#tweet-but");
const tweet_popup = document.querySelector("#tweet-on");
const close_tweet_popup = document.querySelector("#close_pop");

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
const newTweet = document.querySelector("#newTweet");
const input_image = document.querySelector("#input-image");
const newTweetText = document.querySelector("#newTweetText");

// const user_id = 121;
const login_user_name = "121";

const userInfo = localStorage.getItem("data");
const dataUser = JSON.parse(userInfo);
const user_id = dataUser.username;

// api 
const userInfoApi = "http://localhost:3000/getUserInfo.php";
const editProfileApi = "http://localhost:3000/editprofile.php";
const getfollowingApi = "http://localhost:3000/getfollowing.php";
const getFollowersApi = "http://localhost:3000/getfollower.php";
const numberOfTweetApi = "http://localhost:3000/numberOfTweet.php";
const getUnFollowUserApi = "http://localhost:3000/getUnFollowUser.php";
const FollowApi = "http://localhost:3000/follow.php";
const getTweetApi = "http://localhost:3000/getUserTweet.php";
const getLikedTweetApi = "http://localhost:3000/getLikedTweet.php";
const getNbOfLikeApi = "http://localhost:3000/getNbOfLike.php";
const newTweetApi = "http://localhost:3000/newTweet.php";

//to sent the post data in body for get user info
let userInfoData = new FormData();
userInfoData.append("user_id", user_id);

//tweet pop
tweet_button.addEventListener("click", () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  overlay.classList.remove("d-none");
  tweet_popup.classList.remove("d-none");
  body.classList.add("overflow-n");
});

//tweet close pop
close_tweet_popup.addEventListener("click", () => {
  overlay.classList.add("d-none");
  tweet_popup.classList.add("d-none");
  body.classList.remove("overflow-n");
});

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

// post new tweet
let postNewTweetData = new FormData();
const postNewTweet = () => {
  postNewTweetData.append("user_name", login_user_name);
  postNewTweetData.append("tweet_text", newTweetText.value);
  postNewTweetData.append("user_id", user_id);

  fetch(newTweetApi, {
    method: "POST",
    body: postNewTweetData,
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        if (data) {
          location.reload();
        }
      });
    }
  });
};
const tweetreader = new FileReader();
newTweet.addEventListener("click", () => {
  if (input_image.files.length == 0) {
    postNewTweet();
  } else {
    tweetreader.addEventListener("load", () => {
      postNewTweetData.append("tweet_photo", tweetreader.result);
      postNewTweet();
    });
    tweetreader.readAsDataURL(input_image.files[0]);
  }
});

// print full name and user
const printName = (name, user_name) => {
  const currentUserFullName = document.querySelectorAll(".currentUserFullName");
  const userName = document.querySelectorAll(".currentUserName ");
  currentUserFullName.forEach((tag) => {
    tag.textContent = name;
  });
  userName.forEach((tag) => {
    tag.textContent = user_name;
  });
};

// put user img and banner
const profilePhoto = (img, banner) => {
  const userProfilePhoto = document.querySelectorAll(".userProfilePhoto ");
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
const userNewData = new FormData();

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
    const userProfilePhoto = document.querySelectorAll(".userProfilePhoto ");
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

// follow btn
const followUser = (id) => {
  let userIds = new FormData();
  userIds.append("user_id", user_id);
  userIds.append("follow_user_id", id);
  fetch(FollowApi, {
    method: "POST",
    body: userIds,
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

const bluidTweet = (tweet) => {
  let user_tweet = document.createElement("div");
  user_tweet.classList.add("user-tweet");
  let img = document.createElement("div");
  let classesToAdd = ["profilePhoto-circle", "samll", "userProfilePhoto"];
  img.classList.add(...classesToAdd);
  let tweet_info = document.createElement("div");
  tweet_info.classList.add("tweet-info");
  let h4 = document.createElement("h4");
  h4.classList.add("fullName");
  h4.classList.add("currentUserFullName");
  let span = document.createElement("span");
  span.classList.add("userName");
  span.classList.add("currentUserName");
  let dataSpan = document.createElement("span");
  dataSpan.classList.add("tweet-date");
  dataSpan.textContent = tweet.tweet_date;
  let p = document.createElement("p");
  p.classList.add("tweet-text");
  p.textContent = tweet.tweet_text;

  let nbLike = document.createElement("div");
  nbLike.classList.add("nb-like");
  let i = document.createElement("i");
  i.classList.add("fa-regular");
  i.classList.add("fa-heart");
  let nb = document.createElement("span");
  nb.textContent = 456;
  nbLike.appendChild(i);
  nbLike.appendChild(nb);
  tweet_info.appendChild(h4);
  tweet_info.appendChild(span);
  tweet_info.appendChild(dataSpan);
  tweet_info.appendChild(p);
  if (tweet.tweet_photo != null && tweet.tweet_photo != "") {
    let tweet_img = document.createElement("img");
    tweet_img.classList.add("tweet-media");
    tweet_img.src = "http://localhost:3000/" + tweet.tweet_photo;
    tweet_info.appendChild(tweet_img);
  }
  tweet_info.appendChild(nbLike);
  user_tweet.appendChild(img);
  user_tweet.appendChild(tweet_info);

  //get nb of like for this tweet
  let tweetidData = new FormData();
  tweetidData.append("tweet_id", tweet.tweet_id);
  fetch(getNbOfLikeApi, {
    method: "POST",
    body: tweetidData,
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        if (data.done) {
          nb.textContent = data.like;
        }
      });
    }
  });

  if (tweet.tweet_photo != null && tweet.tweet_photo != "") {
    media_tweet_container.appendChild(user_tweet);
  } else {
    tweet_container.appendChild(user_tweet);
  }
};

const bluidLikedTweet = (tweet) => {
  // get user info
  let tweetUserData = new FormData();
  tweetUserData.append("user_id", tweet.user_id);
  let user_tweet = document.createElement("div");
  user_tweet.classList.add("user-tweet");
  let imgUser = document.createElement("img");
  let classesToAdd = ["otherUserPhoto", "samll"];
  imgUser.classList.add(...classesToAdd);
  let tweet_info = document.createElement("div");
  tweet_info.classList.add("tweet-info");
  let h4 = document.createElement("h4");
  h4.classList.add("fullName");
  let span = document.createElement("span");
  span.classList.add("userName");
  let dataSpan = document.createElement("span");
  dataSpan.classList.add("tweet-date");
  dataSpan.textContent = tweet.tweet_date;
  let p = document.createElement("p");
  p.classList.add("tweet-text");
  p.textContent = tweet.tweet_text;
  let nbLike = document.createElement("div");
  nbLike.classList.add("nb-like");
  let i = document.createElement("i");
  i.classList.add("fa-regular");
  i.classList.add("fa-heart");
  let nb = document.createElement("span");
  nbLike.appendChild(i);
  nbLike.appendChild(nb);
  let a = document.createElement("a");
  a.href = "userProfile.html?id=" + tweet.user_id;
  a.appendChild(h4);
  tweet_info.appendChild(a);
  tweet_info.appendChild(span);
  tweet_info.appendChild(dataSpan);
  tweet_info.appendChild(p);
  if (tweet.tweet_photo != null && tweet.tweet_photo != "") {
    let tweet_img = document.createElement("img");
    tweet_img.classList.add("tweet-media");
    tweet_img.src = "http://localhost:3000/" + tweet.tweet_photo;
    tweet_info.appendChild(tweet_img);
  }
  tweet_info.appendChild(nbLike);
  user_tweet.appendChild(imgUser);
  user_tweet.appendChild(tweet_info);

  //get nb of like for this tweet
  let tweetidData = new FormData();
  tweetidData.append("tweet_id", tweet.tweet_id);
  fetch(getNbOfLikeApi, {
    method: "POST",
    body: tweetidData,
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        if (data.done) {
          nb.textContent = data.like;
        }
      });
    }
  });

  fetch(userInfoApi, {
    method: "POST",
    body: tweetUserData,
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        if (data.done) {
          data = data.userInfo;
          if (data.profile_photo != null && data.profile_photo != "") {
            imgUser.src = "http://localhost:3000/" + data.profile_photo;
          }
          h4.textContent = data.full_name;
          span.textContent = data.user_name;
          liked_tweet.appendChild(user_tweet);
        }
      });
    }
  });
};

//getTweet
fetch(getTweetApi, {
  method: "POST",
  body: userInfoData,
}).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      if (data.done) {
        data = data.tweets;
        data.forEach((tweet) => {
          bluidTweet(tweet);
        });
      }
    });
  }
});

//get liked Tweet
fetch(getLikedTweetApi, {
  method: "POST",
  body: userInfoData,
}).then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      if (data.done) {
        data = data.tweets;
        data.forEach((tweet) => {
          bluidLikedTweet(tweet);
        });
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
        fillEditProfile(data.full_name, data.bio, data.birth_day);
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
            img.style.background =
              "url(http://localhost:3000/" + user.profile_photo + ")";
            img.style.backgroundColor = "none";
            img.style.backgroundSize = "cover";
            img.style.backgroundRepeat = "no-repeat";
            img.style.backgroundPosition = "center";
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
          div.appendChild(h4);
          div.appendChild(span);
          let a = document.createElement("a");
          a.appendChild(img);
          a.appendChild(div);
          a.href = "userProfile.html?id=" + user.user_id;
          might_like.appendChild(a);
          might_like.appendChild(button);
          unfollowUser_container.appendChild(might_like);
          button.addEventListener("click", () => {
            followUser(user.user_id);
          });
        });
      }
    });
  }
});
