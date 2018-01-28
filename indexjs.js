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

/*After Container Start*/

/*After container*/

/* --- !important Call function openAfterCon(value); ---
where value :
value = 1 green bin
value = 2 Blue bin
value = 3 Yellow bin
value = 4 Gray bin
value = 5 Red bin
value = 6 Deep green bin
  */

//Use this function as test function
/*var value;
function getMouse(){

    value = 4;
    openAfterCon(value);
}*/


function openAfterCon(value) {
    if (value === 0) {
        document.querySelector(".afterContainer").style.display = "hidden";
    } else {
        if (value === 1) {
            document.querySelector(".afterContainer").style.display = "inline-block";
            document.getElementById("afterContainerGreen").style.transform = "rotateX(0)";
            document.getElementById("afterContainerGreen").style.left = "50%";
            document.getElementById("afterContainerGreen").style.top = "50%";
            setTimeout(scaleGreen, 2000);

            function scaleGreen() {
                document.getElementById("afterContainerGreen").style.transform = "scale(90)";
                document.getElementById("afteriFrame").style.display = "block";
            }
        } else if (value === 2) {
            document.querySelector(".afterContainer").style.display = "inline-block";
            document.getElementById("afterContainerBlue").style.transform = "rotateX(0)";
            document.getElementById("afterContainerBlue").style.left = "50%";
            document.getElementById("afterContainerBlue").style.top = "50%";
            setTimeout(scaleBlue, 2000);

            function scaleBlue() {
                document.getElementById("afterContainerBlue").style.transform = "scale(90)";
                document.getElementById("afteriFrame").style.display = "block";
            }

        }else if (value === 3) {
            document.querySelector(".afterContainer").style.display = "inline-block";
            document.getElementById("afterContainerYellow").style.transform = "rotateX(0)";
            document.getElementById("afterContainerYellow").style.left = "50%";
            document.getElementById("afterContainerYellow").style.top = "50%";
            setTimeout(scaleYellow, 2000);

            function scaleYellow() {
                document.getElementById("afterContainerYellow").style.transform = "scale(90)";
                document.getElementById("afteriFrame").style.display = "block";
            }

        }else if (value === 4) {
            document.querySelector(".afterContainer").style.display = "inline-block";
            document.getElementById("afterContainerGray").style.transform = "rotateX(0)";
            document.getElementById("afterContainerGray").style.left = "50%";
            document.getElementById("afterContainerGray").style.top = "50%";
            setTimeout(scaleGray, 2000);

            function scaleGray() {
                document.getElementById("afterContainerGray").style.transform = "scale(90)";
                document.getElementById("afteriFrame").style.display = "block";
            }

        }else if (value === 5) {
            document.querySelector(".afterContainer").style.display = "inline-block";
            document.getElementById("afterContainerRed").style.transform = "rotateX(0)";
            document.getElementById("afterContainerRed").style.left = "50%";
            document.getElementById("afterContainerRed").style.top = "50%";
            setTimeout(scaleRed, 2000);

            function scaleRed() {
                document.getElementById("afterContainerRed").style.transform = "scale(90)";
                document.getElementById("afteriFrame").style.display = "block";
            }

        }else if (value === 6) {
            document.querySelector(".afterContainer").style.display = "inline-block";
            document.getElementById("afterContainerDGreen").style.transform = "rotateX(0)";
            document.getElementById("afterContainerDGreen").style.left = "50%";
            document.getElementById("afterContainerDGreen").style.top = "50%";
            setTimeout(scaleDGreen, 2000);

            function scaleDGreen() {
                document.getElementById("afterContainerDGreen").style.transform = "scale(90)";
                document.getElementById("afteriFrame").style.display = "block";
            }

        }
    }
}