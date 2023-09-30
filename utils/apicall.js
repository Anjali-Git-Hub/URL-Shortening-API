import { submit,textInput } from "../script.js";
const ul=document.querySelector(".dropdown-list");


//copy function 
function copyShortLinkToClipboard(shortLink) {
    const tempInput = document.createElement("input");
    tempInput.setAttribute("value", shortLink);
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); 

    document.execCommand("copy");

    document.body.removeChild(tempInput);
}
ul.addEventListener("click", function (event) {
    if (event.target.classList.contains("copy")) {
        event.preventDefault()
        const shortLink = event.target.previousElementSibling.textContent;
        copyShortLinkToClipboard(shortLink);
        event.target.textContent = "Copied!";
    }
});


// api call
function apiCall(){
    const xhr=new XMLHttpRequest();
    const URL=`https://api.shrtco.de/v2/shorten?url=${textInput.value.trim()}`
    xhr.open("GET",URL);
    const getShortLinks=async()=>{
        const response= await fetch(URL);
        if(response.ok){
            const data=response.json()
            return data;
        }
       else{
        console.log("something went wrong...");
      }

}
getShortLinks().then((response)=>{
    const li = document.createElement("li");
    const shortLink = response.result.short_link;
    const innerHTML = `
   <h2> ${textInput.value.trim()} </h2>
    <hr>
    <div>
    <a href="#" class="short">${shortLink}</a>
    <button class="copy btn">Copy Link</button>
    </div>
    `
    li.innerHTML=innerHTML;
    ul.append(li);
    textInput.value = "";
    
}).catch(()=>{
    console.log("check the internet connection!")
})
xhr.send();
}
export default apiCall