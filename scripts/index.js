const sign_up_email=document.querySelector("#sign_up_email");
const join_form=document.querySelector("#join-form");
const signup=document.querySelector("#signup-form");
const close_create=document.querySelector("#close_create");

sign_up_email.addEventListener('click',()=>{
  join_form.classList.add('goBack');
  signup.classList.remove('d-none');
  join_form.classList.add('d-none');
  
});

close_create.addEventListener('click',()=>{
  join_form.classList.remove('goBack');
  signup.classList.add('d-none');
  join_form.classList.remove('d-none');

  
});