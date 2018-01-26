//function for document on ready event
$(document).ready(function(){
    //onclick function for menu nav
    $(".navBtn").click(function(){
        //cgange icon and hide nav
        $("#navMenu").toggleClass("hideMenuNav");
        $("#navDivBtn").toggleClass("hideMenuDiv");
        $("#navBtnIcn").toggleClass("fa-angle-double-left fa-angle-double-right");
    });
});