// "use strict"
import apiCall from "./utils/apicall.js";

export const submit = document.querySelector('input[type="submit"]');
export const textInput=submit.previousElementSibling.firstElementChild;
const parentTextInput=textInput.parentElement;



// Define a regular expression pattern for a URL
const urlPattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;

submit.addEventListener("click", (e) => {
    e.preventDefault();
    const userInput = textInput.value.trim(); 

    if (!userInput) {
        textInput.style.border = "2px solid red";
        parentTextInput.setAttribute("add-content", "This field is required");
    }

    else if (!urlPattern.test(userInput)) {
        // Invalid URL format
        textInput.style.border = "2px solid red";
        parentTextInput.setAttribute("add-content"," Please enter a valid URL");
        
    } 
    else {
        // Valid URL
        textInput.style.border = "none";
        parentTextInput.removeAttribute("add-content");
      // api calling
        apiCall()
       

      
   
    }
});