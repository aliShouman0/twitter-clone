const tweet=document.querySelector('#tweet-but');
const close=document.querySelector('#close');
const pop=document.querySelector('#tweet-on');
const logout=document.querySelector('#logout');
const profile=document.querySelector('#profile');
const popup=document.querySelector('#popup');
const add=document.querySelector('#tweet');
const text=document.querySelector('#tweet_text');
const image=document.querySelector('#input-image');



const n=document.querySelector('#log_name');
const u=document.querySelector('#log_user');



var userName=' ';
var userId=' ';
var userInfo = localStorage.getItem('data');
var dataUser = JSON.parse(userInfo);
console.log(dataUser.username);



let data = new FormData();
data.append("user_id", dataUser.username);
console.log('send data'+dataUser.username);

fetch('http://localhost/data/user.php',{
    method: "POST",
    body: data,
}).then((res) => {
    console.log(res);
    return res.json();
}).then((data) =>{
    console.log('data'+data.done);
    console.log('data'+data.user.full_name);
    userName=data.user.full_name;
    userId=data.user.user_id;

    console.log('name'+userName);
    console.log('id'+userId);


    n.innerHTML=data.user.full_name;
    u.innerHTML=data.user.user_name;
    

})



const reader = new FileReader();

let userNewData = new FormData();

//send img
add.addEventListener("click", () => {
  reader.addEventListener("load", () => {
    userNewData.append("tweet_photo", reader.result);
    post();
  });
  reader.readAsDataURL(image.files[0]);
});


//send new info
const post = () => {
  //let Newbirth_day = day.value + "-" + month.value + "-" + year.value;
  userNewData.append("user_name", userName);
  userNewData.append("tweet_text", text.value);
  userNewData.append("user_id", userId);

  fetch('http://localhost/data/post.php', {
    method: "POST",
    body: userNewData,
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        if (data.done) {
          //location.reload();
        }
      });
    }
  });
};



tweet.addEventListener('click',() =>{
    pop.style.display='flex';
    pop.style.position='fixed';
    home.style.opacity=0.8;
    home.style.pointerEvents='none';
    home.style.userSelect='none';
})

close.addEventListener('click',() =>{
    pop.style.display='none';
    home.style.opacity=1;
    home.style.pointerEvents='';
    home.style.userSelect='';
})

popup.addEventListener('click',() =>{
    logout.classList.toggle('on');
    /*logout.classList.toggle('on');
    profile.classList.toggle('down');
    more.classList.toggle('disable');*/
})
















































