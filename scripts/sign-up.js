//connect to HTML tags
const full_name=document.querySelector('#full_name');
const user_name=document.querySelector('#user_name');
const email=document.querySelector('#email');
const password=document.querySelector('#password');
const month=document.querySelector('#month');
const day=document.querySelector('#day');
const year=document.querySelector('#year');
const signup=document.querySelector('#signup');
const form=document.querySelector('#form');

//waiting for clicking  
signup.addEventListener('click',()=>{
    let date=`${day.value}-${month.value}-${year.value}`;
    
    //add user info to data
    let data = new FormData();
    data.append("full_name", full_name.value);
    data.append("user_name", user_name.value);
    data.append("email", email.value);
    data.append("password", password.value);
    data.append("birth_day", date);
    
    //fetch sign-up api
    fetch("http://localhost/data/sign-up.php", {
    method: "POST",
    body: data,
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        if (data.done) {
          location.reload();
        }
      });
    }
  })

})



        


/*const full_name=document.querySelector('#name').value;
const user_name=document.querySelector('#username').value;
const email=document.querySelector('#email').value;
const password=document.querySelector('#password');
const month=document.querySelector('#month');
const day=document.querySelector('#day');
const year=document.querySelector('#year');*/
/*const signup=document.querySelector('#signup');
const form=document.querySelector('#form');

/*signup.addEventListener('click',()=>{
    let date=`${day.value}-${month.value}-${year.value}`;
    document.write(day.value);
})*/

/*form.addEventListener('submit' , e => {
    e.preventDefault();
    const data=new URLSearchParams();
    for (const p of new FormData(form)){ //append our information into data 
        data.append(p[0],p[1],p[2],p[3],p[4],p[5],p[6]);
        console.log(p);
    }

    console.log(data);

    //fetch the api used to inset data to database
    fetch('http://localhost/data/sign-up.php' , {
        method: 'POST',  //define the method as POST
        body: data    //put data in the body
    }).then(response => response.text()).then(response => {
        console.log(response);
    }).catch(error => console.log(error));
    })*/
