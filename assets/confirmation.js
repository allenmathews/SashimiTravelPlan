var confirmbtn = document.getElementById("confirm");
var fromAddress = localStorage.getItem("fromAddress");
var toAddress = localStorage.getItem("toAddress");
console.log (fromAddress, toAddress);

var fromDiv = document.getElementById("fromAddress");
var toDiv = document.getElementById("toAddress");
fromDiv.textContent = fromAddress;
toDiv.textContent = toAddress;

confirmbtn.addEventListener("click", function(){

window.location.href = "/result.html";
});
