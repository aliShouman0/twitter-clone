const popup=document.querySelector('#popup');
const logout=document.querySelector('#logout');
const profile=document.querySelector('#profile');
const tweet=document.querySelector('#tweet-but');
const pop=document.querySelector('#tweet-on');
const home=document.querySelector('#home');
const close=document.querySelector('#close');
const more=document.querySelector('#more');
const theme=document.querySelector('#theme');
const modetype=document.querySelector('#mode-type');
const option=document.querySelector('#option');
const featurs=document.querySelector('#features');
const element=document.querySelectorAll('.element');
const logo=document.querySelector('#logo');


popup.addEventListener('click',() =>{
    logout.classList.toggle('on');
    profile.classList.toggle('down');
    more.classList.toggle('disable');
})

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

more.addEventListener('click',()=>{
    theme.classList.toggle('theme');
    profile.classList.toggle('down-more');
})

theme.addEventListener('click',()=>{
    if(modetype.innerHTML=='Dark'){
        modetype.innerHTML='Light';
        theme.classList.toggle('theme');
        profile.classList.toggle('down-more');
        option.classList.add('lightmode');
        for(let i=0;i<element.length;i++){
            element[i].classList.add('lightmode');
            /*element[i].addEventListener('onmousemove' ,()=>{
                element[i].classList.add('light-hover');
            })*/
        }
        logo.classList.add('blue');
    }

    else{
        modetype.innerHTML='Dark';
        theme.classList.toggle('theme');
        profile.classList.toggle('down-more');
        option.classList.remove('lightmode');
        for(let i=0;i<element.length;i++){
            element[i].classList.remove('lightmode');
            //element[i].classList.remove('light-hover');
        }
        logo.classList.remove('blue');
    }
    
})