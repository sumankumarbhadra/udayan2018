
var navFlag = false;
function showNav() {

    if (navFlag === false) {
        document.querySelector("#mainNav").style.width = "100%";
        document.querySelector("#mNavBtn").style.transform="translateX(-100px)";
        document.querySelector("#mNavBtn2").style.top="15px";

        return navFlag = true;

    }else  if(navFlag === true)
        {
            document.querySelector("#mainNav").style.width = "0%";
            document.querySelector("#mNavBtn").style.transform="translateX(15px)";
            document.querySelector("#mNavBtn2").style.top="-100px";
            return navFlag = false;
        }
}
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