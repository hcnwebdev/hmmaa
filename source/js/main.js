import jump from '../js/vendor/jump.js';

var topBtn = document.querySelector(".js-top-btn");
var whatBtn = document.querySelector(".js-what-btn");
var whoBtn = document.querySelector(".js-who-btn");
var contactBtn = document.querySelector(".js-contact-btn");
var toggler = document.querySelector(".toggler");

const jumpTime = 1000;


topBtn.addEventListener("click", function(e) {
    e.preventDefault(),
    jump(".header", {
        duration: jumpTime
    }),
    toggler.checked = false;
})
whatBtn.addEventListener("click", function(e) {
    e.preventDefault(),
    jump("#we_do", {
        duration: jumpTime
    }),
    toggler.checked = false;
})
whoBtn.addEventListener("click", function(e) {
    e.preventDefault(),
    jump("#we_are", {
        duration: jumpTime
    }),
    toggler.checked = false;
})
contactBtn.addEventListener("click", function(e) {
    e.preventDefault(),
    jump("#contact", {
        duration: jumpTime
    }),
    toggler.checked = false;
})

// Textarea Toggler

const textareaEle = document.querySelector('.js-textarea-box');

/*
document.querySelector('.js-select').addEventListener('change', function() {
    if (this.value == 'Other'){ 
        textareaEle.classList.remove("hidden");
    } else { textareaEle.classList.add("hidden"); }
});*/

document.querySelector('.js-other-option').addEventListener('change', function() {
    if (this.checked){ 
        textareaEle.classList.remove("hidden");
    } else { textareaEle.classList.add("hidden"); }
});



// Contact Form --------------------------------------------------------------

// Serialize -------------------------------------------------------------------

function serializer(form) {
  if (!form || form.nodeName !== "FORM") {
    return;
  }
  var i, j, q = [];
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === "") {
      continue;
    }
    switch (form.elements[i].nodeName) {
    case 'INPUT':
      switch (form.elements[i].type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'url':
      case 'search':
      case 'hidden':
      case 'password':
      case 'button':
      case 'reset':
      case 'submit':
        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
        break;
      case 'checkbox':
      case 'radio':
        if (form.elements[i].checked) {
          q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
        }						
        break;
      case 'file':
        break;
      }
      break;			 
    case 'TEXTAREA':
      q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
      break;
    case 'SELECT':
      switch (form.elements[i].type) {
      case 'select-one':
        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
        break;
      case 'select-multiple':
        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
          if (form.elements[i].options[j].selected) {
            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
          }
        }
        break;
      }
      break;
    case 'BUTTON':
      switch (form.elements[i].type) {
      case 'reset':
      case 'submit':
      case 'button':
        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
        break;
      }
      break;
    }
  }
  return q.join("&");
}

var serialize = serializer;

// Get the form.
const contactForm = document.querySelector('.js-cform'), // Get the contact form
      submitBtn = document.querySelector('.js-cform-btn'), // Get the submit button.
      contactFormResp = document.querySelector('.js-cform-resp'); // Get the messages div.
      //messageBox = document.querySelector('#formModal');
      
const messageBox = new bootstrap.Modal(document.getElementById('formModal'));

const engResponses = [
  '<p><span class="h3">Thank you!</span><br>We’ll be in touch shortly.</p>',
  '<p><span class="h3" style="color:red">Ups!</span><br>There was an error.</p>',
  '<p><span class="h3" style="color:red">Ups!</span><br>There was a connection error.</p>'
]
const spaResponses = [
  '<p><span class="h3">¡Gracias!</span><br>En breve le contactaremos.</p>',
  '<p><span class="h3" style="color:red">Ups!</span><br>Hubo un error.</p>',
  '<p><span class="h3" style="color:red">Ups!</span><br>Hubo un error de conexión.</p>'
]

// When the form is submited.
contactForm.onsubmit = function(e){
    
  e.preventDefault();
  
  var formData = serialize(contactForm);
  
  var formLang = document.querySelector('.js-cform-lang').value;
  
  var responseMsg = formLang == "spa" ? spaResponses : engResponses;
  
  contactFormResp.innerHTML = '<p><img alt="loader" src="img/loader.gif" width="128" height="128" /></p><p>Sending your message!</p>';
  messageBox.show();
  
  var request = new XMLHttpRequest();
  
  request.open('POST', 'bin/mailer.php', true);
  
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  
  request.onload = function() {    
    if (request.status >= 200 && request.status < 400) {
      // Success!
      contactFormResp.innerHTML = responseMsg[0];
      contactForm.reset();
    } else {
    // Reached target server, but it returned an error
      contactFormResp.innerHTML = responseMsg[1];
      messageBox.show();
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    contactFormResp.innerHTML = responseMsg[2];
    messageBox.show();
  };
  
  request.send(formData);
};

  







