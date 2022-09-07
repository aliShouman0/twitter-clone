const sign_up_email=document.querySelector("#sign_up_email");
const container=document.querySelector("#container");
const join_form=document.querySelector("#join-form");
const signup=document.querySelector("#signup-form");
const close_Join=document.querySelector("#close-Join");
const close_create=document.querySelector("#close_create");

sign_up_email.addEventListener('click',()=>{
  join_form.classList.add('goBack');
  signup.classList.remove('d-none');
  
});

close_create.addEventListener('click',()=>{
  join_form.classList.remove('goBack');
  signup.classList.add('d-none');
  
});