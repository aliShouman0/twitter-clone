
const login=document.querySelector('#login');
const email=document.querySelector('#email');
const password=document.querySelector('#password');

login.addEventListener('click',()=>{
    let data = new FormData();
    data.append("email", email.value);
    data.append("password", password.value);

    fetch("http://localhost/data/login.php",{
        method: "POST",
        body: data,
    }).then((res) => {
        return res.json();
    }).then((data) =>{
        console.log(data.done);
        if(data.done==true){
            window.location.href='./new.html';
        }
        else{
            location.reload();
        }
    }).catch((error) =>{
        console.log(error);
    })
})