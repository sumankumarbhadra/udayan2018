//function for document on ready event
var navWidth;
var navFlag = true;
$(document).ready(function(){
    //onclick function for menu nav
    $(".navBtn").click(function(){
        //cgange icon and hide n
        navWidth = document.getElementById("navMenu").width;
        $("#navBtnIcn").toggleClass("fa-angle-double-left fa-angle-double-right");
    });
});
