const open_form=document.querySelector("#open");
const close_form=document.querySelector("#close");
const form=document.querySelector("#login-pop");

open_form.addEventListener('click',()=>{
    form.style.display='flex'; 
});

close_form.addEventListener('click',()=>{
    form.style.display='none'; 
});

