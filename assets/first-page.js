var searchbtn = document.getElementById("search");
var from = document.getElementById("from");
var to = document.getElementById ("to");

searchbtn.addEventListener("click", function(){
    var fromAddress = from.value;
    var toAddress = to.value;

    localStorage.setItem("fromAddress", fromAddress);
    localStorage.setItem("toAddress", toAddress);

    window.location.href = "confirmation.html";
});