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