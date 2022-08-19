/*Final Project
Student : Kseniia Katashova
Student ID: 138164207
Date: 19/08/2022
*/

// show a hiden box for hourly rate
const box = document.getElementById('rate');

function handleRadioClick() {
    if (document.getElementById('hiring').checked){
        box.style.display = 'block';
    }
    else{
        box.style.display = 'none';
    }
}

const radioButtons = document.querySelectorAll('input[name="purpose"]');
radioButtons.forEach(radio => {
    radio.addEventListener('click', handleRadioClick);
});



//Validation of the form

const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');

const feedbackEl = document.querySelector('#feedback');

const form = document.querySelector('#signup');


//Not empty field
const isRequired = value => value === '' ? false : true;

//check if the user put First Name and Last Name 
const isNameValid = (username) => {
    const re =  /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
    return re.test(username);
}

//Check if valid email
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

//Phone number is valid
const isPhoneValid = (phone)=> {
    const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
};

//Show the error/success
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
};


const checkUsername = () => {

    let valid = false;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isNameValid(username)) {
        showError(usernameEl, `Put firstname AND lastname.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const checkPhone = () =>{
    let valid = false;
    const phone = phoneEl.value.trim();
    if(!isRequired(phone)) {
        showError(phoneEl, 'Phone number cannot be blank.');
    } else if(!isPhoneValid(phone)) {
        showError(phoneEl, 'Phone number is invalid.')
    }
    else {
        showSuccess(phoneEl);
        valid=true;
    }
    return valid;
}


const checkFeedback = () =>{
    let valid = false;
    const feedback = feedbackEl.value.trim();
    if (!isRequired(feedback)) {
        showError(feedbackEl, 'Please put you feedback.');
    } 
    else {
        showSuccess(feedbackEl);
        valid = true;
    }
    return valid;
}


var bindEvents = function(event){
    if( document.getElementById('feedback').value.trim() === '' ){
        event.preventDefault();
        alert("Write some feedback please");
    }
};


window.onload=function(){
    document.form[0].addEventListener('submit', bindEvents, true);
};

form.addEventListener('submit', function (e) {

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPhoneValid = checkPhone(),
        isFeedbackValid = checkFeedback();

    let isFormValid = isUsernameValid && isEmailValid &&
        isPhoneValid && isFeedbackValid;

    if (!isFormValid) {
        e.preventDefault();
    }
    return false;
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkPhone();
                break; 
        case 'feedback':
            checkFeedback();
            break;    
    }
}));

