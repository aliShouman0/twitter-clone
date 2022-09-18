const tweet=document.querySelector('#tweet-but');
const close=document.querySelector('#close');
const pop=document.querySelector('#tweet-on');
const logout=document.querySelector('#logout');
const profile=document.querySelector('#profile');
const popup=document.querySelector('#popup');
const add=document.querySelector('#tweet');
const text=document.querySelector('#tweet_text');
const image=document.querySelector('#input-image');
const search=document.querySelector('#search');
const start=document.querySelector('#startsearch');

const namebar=document.querySelector('#log_name');
const userbar=document.querySelector('#log_user');

const list=document.querySelector('#list');
const bar=document.querySelector('#search-result');
const searchname=document.querySelector('#search-name');
const searchuser=document.querySelector('#search-user');
const createpost=document.querySelector('#post-feed');

const textpopup=document.querySelector('#text-on');
const imagepopup=document.querySelector('#image-on');
const submitpopup=document.querySelector('#submit-tweet-on');
const logoutuser=document.querySelector('#logoutuser');

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

    namebar.innerText=data.user.full_name;
    userbar.innerText=data.user.user_name; 
})


const reader = new FileReader();

let userNewData = new FormData();

add.addEventListener("click", () => {

  reader.addEventListener("load", () => {
    userNewData.append("tweet_photo", reader.result);
    post();
  });
  reader.readAsDataURL(image.files[0]);
});


const post = () => {
  userNewData.append("user_name", userName);
  userNewData.append("tweet_text", text.value);
  userNewData.append("user_id", userId);

  fetch('http://localhost/data/post.php', {
    method: "POST",
    body: userNewData,
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


tweet.addEventListener('click',() =>{
    pop.style.display='flex';
    pop.style.position='fixed';
})

close.addEventListener('click',() =>{
    pop.style.display='none';
})

popup.addEventListener('click',() =>{
    logout.classList.toggle('on');
})

start.addEventListener('click', () =>{
    console.log(search.value);
    let searchUser = new FormData();

    searchUser.append('full_name',search.value);

    fetch('http://localhost/data/search.php', {
    method: "POST",
    body: searchUser,
  }).then((res) => {
    if (res.ok) {
        //console.log(res);
      res.json().then((data) => {
        if (data) {
            console.log(data[0].user_id);
                searchname.innerText=data[0].full_name;
                searchuser.innerText=data[0].user_name
        }
      });
    }
  });

})

    let gettweet = new FormData();

    gettweet.append('user_id',dataUser.username);

    fetch('http://localhost/data/getfollowingtweet.php', {
    method: "POST",
    body: gettweet,
  }).then((res) => {
    if (res.ok) {
        //console.log(res);
      res.json().then((data) => {
        if (data) {
            console.log(data[0].user_id);
            for (let i=0; i<data.length;i++){
                console.log('date'+data[i].tweet_date);
                console.log('userpost'+data[i].user_name);
                var post=document.createElement('div');
                post.style.backgroundColor='';
                post.style.color='white';
                post.style.display='flex';
                post.style.flexDirection='column';
                post.style.borderBottom='1px solid grey';
                post.marginTop='1%';
                //post.classList.add('tweet-post');

                var tweet_post=document.createElement('div');
                tweet_post.style.display='flex';
                tweet_post.style.marginTop='1%';
                var image=document.createElement('img');
                image.src=data[i].tweet_photo;
                image.style.width='50px';
                image.style.heigth='50px';
                image.style.marginLeft='12px';
                image.style.borderRadius='50px';
                
                var info=document.createElement('h1');
                info.innerText=data[i].user_name + '  ' + data[i].tweet_date;
                info.style.fontSize="16px";
                info.style.margin="2%";

                var br=document.createElement('br');
                
                var text=document.createElement('p');
                text.innerText=data[i].tweet_text;
                text.style.fontSize="16px";
                text.style.marginLeft="11%";
                

                var body=document.createElement('div');
                body.append(text);
                body.style.margin='1%';
                
                var image_post=document.createElement('div');
                var tweet_image=document.createElement('img');
                tweet_image.src=data[i].tweet_photo;
                tweet_image.style.margin='2% 0 2% 12%';
                tweet_image.style.width='80%';
                tweet_image.style.height='50%';
                tweet_image.style.borderRadius='20px';
                image_post.append(tweet_image);
                
                
                var photo_path=data[i].tweet_photo.toString();
                console.log('path'+photo_path);
                if(!photo_path.match('photo')){
                    image_post.style.display='none';
                    image.src='assets/21.png';
                }

                var like=document.createElement('div');
                like.style.display='flex';
                like.style.justifyContent='end';
                like.style.marginBottom='2%';
                var liked=document.createElement('a');
                var icon=document.createElement('i');
                icon.classList.add("fa-heart");
                var numberLike=document.createElement('p');
                numberLike.innerHTML='100k';
                numberLike.style.textAlign='end';
                numberLike.style.margin='3px 10% 0 0';
                 liked.innerHTML='like';
                 liked.style.cursor='pointer';
                 liked.style.float='right';
                 liked.style.margin= '0 1% 0 0';   
                 liked.append(icon);

                liked.classList.add('like-button');
                liked.style.color='white';

                like.append(liked);
                like.append(numberLike);
                

                tweet_post.append(image);
                tweet_post.append(info);
                tweet_post.append(br);
                //tweet_post.append(text);
                post.append(tweet_post);
                post.append(body);
                post.append(image_post);
                post.append(like);
            
                createpost.append(post);
            }
          //location.reload();
        }
      });
    }
  });


  const tweetreader = new FileReader();

  let userNewPost = new FormData();
  
  submitpopup.addEventListener("click", () => {
    reader.addEventListener("load", () => {
      userNewPost.append("tweet_photo", tweetreader.result);
      newTweet();
    });
    tweetreader.readAsDataURL(imagepopup.files[0]);
  });
  
  
  const newTweet = () => {
    userNewPost.append("user_name", userName);
    userNewPost.append("tweet_text", textpopup.value);
    userNewPost.append("user_id", userId);
  
    fetch('http://localhost/data/post.php', {
      method: "POST",
      body: userNewPost,
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
  

logoutuser.addEventListener('click',()=>{
    window.localStorage.clear();
    window.location.href='./index.html';
})










































