//function for document on ready event
$(document).ready(function(){
//drone
var $p1 = $("#l-prop1");
var $p2 = $("#l-prop2");
var $p3 = $("#r-prop1");
var $p4 = $("#r-prop2");
var $drone = $("#drone-container");
var blade;
var speed = .01;
var $delay = 1;


//Left Blades
rotateBladeLeft($p1, speed)
rotateBladeRight($p2, speed)

//Right Blades
rotateBladeLeft($p4, speed)
rotateBladeRight($p3, speed)

function rotateBladeLeft(blade, speed) {
var spin = "230px";
TweenMax.to(blade, speed, {x:spin, scaleX:".1", ease:Power2.easeNone, repeat:-1, yoyo:true});
}

function rotateBladeRight(blade, speed) {
var spin = "-35px";
TweenMax.to(blade, speed, {x:spin, scaleX:".1", ease:Power2.easeNone, repeat:-1, yoyo:true});
}
});

/*Nav menu start*/
var navWidth;
var navFlag = true;
function init() {
    document.getElementById("navDivBtn").addEventListener("click", navHandelClick);
    setTimeout(navHandelClick, 1200);//auto close menu on loading page
}

function navHandelClick() {
    navWidth = document.getElementById("navMenu");
    if(navFlag === true){
        navWidth.style.width = "0";
        document.getElementById("navDivBtn").style.marginLeft="0%";
        document.getElementById("navBtnIcn").style.transform="rotate(180deg)";
        return navFlag = false;
    }else if(navFlag === false){
        navWidth.style.width = "17%";
        document.getElementById("navDivBtn").style.marginLeft="17%";
        document.getElementById("navBtnIcn").style.transform="rotate(360deg)";
        return navFlag = true;
    }
}

/*Nav menu end*/
/* dock */
/* dock */
$(document).ready(function(){
    $("ul.osx-dock li").each(function (type) {
        $(this).hover(function () {
             $(this).prev("li").addClass("nearby");
             $(this).next("li").addClass("nearby");
        },
        function () {
             $(this).prev("li").removeClass("nearby");
             $(this).next("li").removeClass("nearby");
        });
   });
});


/*After container*/
var value;
function getMouse(){

    value = 2;
    openAfterCon(value);
}
function openAfterCon(value) {
    if(value === 1){
        document.getElementById("afterContainerGreen").style.transform= "rotateX(0)";
    }else if(value === 2 )
    {
        document.getElementById("afterContainerBlue").style.transform= "rotateX(0)";
        document.getElementById("afterContainerBlue").style.left="50%";
        document.getElementById("afterContainerBlue").style.top="50%";

    }
}