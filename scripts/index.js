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
