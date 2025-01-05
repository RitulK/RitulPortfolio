// const form= document.getElementById('Contactme');
// const username= document.getElementById('username');
// const email= document.getElementById('email');
// const messageme= document.getElementById('messageme');

// form.addEventListener('submit',e=>{
//     e.preventDefault();
//     validateInputs();
// });

// const setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//     inputControl.classList.remove('success')
// }
// const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = '';
//     inputControl.classList.add('success');
//     inputControl.classList.remove('error');
// }

// const isValidEmail = email => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
// const validateInputs = () => {
//     const usernameValue = username.value.trim();
//     const emailValue = email.value.trim();
//     const messagemeValue = messageme.value.trim();

//     if(usernameValue===''){
//         setError(username, "Name is required")
//     }
//     else{
//         setSuccess(username);
//     }
//     if(emailValue===''){
//         setError(email, "Email is required")
//     }
//     else if(!isValidEmail(emailValue)){
//         setError(email, "Provide a valid email address")
//     }
//     else{
//         setSuccess(email);
//     }

//     if(messagemeValue===''){
//         setError(messageme,"Message is a required field")
//     }
//     else{
//         setSuccess(messageme);
//     }

//     form.addEventListener('submit', e => {
//         e.preventDefault()
//         fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//         const successMessage = document.getElementById('successMessage');
//         successMessage.innerText = 'Thank you for your kind words!';
//         })

// };


/*===== COPY Email =====*/
// const copy = document.getElementById( "copy" );
// copy.addEventListener( "click", () => {
//   navigator.clipboard.writeText( "zulfiqarshaikhofficial92@gmail.com" );
//   copy.innerHTML = "copied";
//   setTimeout( () => {
//     copy.innerHTML = null;
//   }, 1000 );
// } );

document.getElementById("copy").addEventListener("click", () => {
    navigator.clipboard.writeText("ritulkulkarni03@gmail.com");
    alert("Email copied to clipboard!");
});


/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal( {
  origin: "top",
  distance: "80px",
  duration: 800,
  reset: true,
} );

/*SCROLL ABOUT*/
// sr.reveal( ".about-img", {} );
// sr.reveal( ".about-subtitle", { delay: 400 } );
// sr.reveal( ".about-text", { delay: 400 } );

sr.reveal(".about-intro", { 
    delay: 200, 
    origin: "top", 
    distance: "50px", 
    duration: 1000, 
    easing: "ease-out" 
});

sr.reveal(".about-intronext", { 
    delay: 300, 
    origin: "right", 
    distance: "50px", 
    duration: 1000, 
    easing: "ease-out" 
});

sr.reveal(".about-text", { 
    delay: 400, 
    origin: "bottom", 
    distance: "50px", 
    duration: 1200, 
    easing: "ease-in-out", 
    opacity: 0 
});

sr.reveal(".about-contact", { 
    delay: 500, 
    scale: 0.8, 
    duration: 1000, 
    easing: "ease-out", 
    opacity: 0 
});



/*SCROLL SKILLS*/
sr.reveal( ".skills-subtitle", {} );
sr.reveal( ".skills-text", {} );
sr.reveal( ".skills-data", { interval: 100 } );
// sr.reveal(".skills-img", { delay: 600 });

/*SCROLL projects*/
sr.reveal( ".project-img", { interval: 200 } );