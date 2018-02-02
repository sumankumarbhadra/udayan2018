//function for document on ready event
$(document).ready(function(){

    //day night theme change

    var date= new Date();
    var hour= date.getHours();
   if(hour>6 && hour<18)
     {
       //day
       $("#bgimg").attr("src","assets/temporary/Backgrounds/Backgroundday.png");
       $("html").css("background","radial-gradient(ellipse at bottom, #489cff 0%, #26a9e1 100%)");
       $("#stars").css("display", "none");
       $("#stars2").css("display", "none");
       $("#stars3").css("display", "none");
       //gapfix
         $("body").css("bottom","0px");
     }
   else
     {
         //night
         $("#udayanLogo").attr("src","assets/temporary/Backgrounds/Logonight.png");
         $("#bgimg").attr("src","assets/temporary/Backgrounds/Backgroundnight.png");
         $("#bodies").attr("src","assets/temporary/Backgrounds/moon.png");
         $(".trash , .drone").css("filter","grayscale(20%)");
	     $(" #scene ").css("opacity","0.9");
         $(".DBS").css("filter","grayscale(20%)");
         $("#drone , #wing1 , #wing2, #plane").css("filter","grayscale(20%)");
	     $(".blades , .stand").css("filter","grayscale(20%)");
         //gapfix
         $("body").css("top","-6px");
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

//flag show
$("#greenDB").on("mouseover", function(){
  $(".flag1").css("display","block");
});
$("#greenDB").on("mouseout", function(){
  $(".flag1").css("display","none");
});


$("#blueDB").on("mouseover", function(){
  $(".flag2").css("display","block");
});
$("#blueDB").on("mouseout", function(){
  $(".flag2").css("display","none");
});


$("#yellowDB").on("mouseover", function(){
  $(".flag3").css("display","block");
});
$("#yellowDB").on("mouseout", function(){
  $(".flag3").css("display","none");
});


$("#blackDB").on("mouseover", function(){
  $(".flag4").css("display","block");
});
$("#blackDB").on("mouseout", function(){
  $(".flag4").css("display","none");
});


$("#redDB").on("mouseover", function(){
  $(".flag5").css("display","block");
});
$("#redDB").on("mouseout", function(){
  $(".flag5").css("display","none");
});


$("#brownDB").on("mouseover", function(){
  $(".flag6").css("display","block");
});
$("#brownDB").on("mouseout", function(){
  $(".flag6").css("display","none");
});

});

/*Nav menu start*/
var navWidth;
var navFlag = true;
function init() {
    document.getElementById("navDivBtn").addEventListener("click", navHandelClick);
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
    document.getElementById("mainOverlay").addEventListener("touchend", closePop,false);

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
value = 0 close After container
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

    value = 1;
    openAfterCon(value);
}*/
function setSource(source){
	$('#afteriFrame').attr('src',source);
}
function closeiframe(){
         document.getElementById("afterContainerGreen").style.transform = "scale(0)";
         document.getElementById("afterContainerBlue").style.transform = "scale(0)";
          document.getElementById("afterContainerYellow").style.transform = "scale(0)";
          document.getElementById("afterContainerGray").style.transform = "scale(0)";
          document.getElementById("afterContainerRed").style.transform = "scale(0)";
          document.getElementById("afterContainerDGreen").style.transform = "scale(0)";
        document.getElementById("afteriFrame").style.width = "0%";
        document.getElementById("afteriFrame").style.height = "0%";
        document.getElementById("iframeclose").style.display = "none";
}
function openAfterCon(value) {
    if (value === 0) {
        document.querySelector(".afterContainer").style.display = "none";
        document.getElementById("afteriFrame").style.width = "0%";
        document.getElementById("afteriFrame").style.height = "0%";
        document.getElementById("iframeclose").style.display = "none";
    } else {
        document.getElementById("iframeclose").style.display = "block";
        if (value === 1) {
            document.querySelector(".afterContainer").style.display = "inline-block";
            document.getElementById("afterContainerGreen").style.transform = "rotateX(0)";
            document.getElementById("afterContainerGreen").style.left = "50%";
            document.getElementById("afterContainerGreen").style.top = "50%";
            setTimeout(scaleGreen, 2000);

            function scaleGreen() {
                document.getElementById("afterContainerGreen").style.transform = "scale(90)";
                document.getElementById("afteriFrame").style.display = "block";
                document.getElementById("afteriFrame").style.width = "100%";
                document.getElementById("afteriFrame").style.height = "100%";
                document.getElementById("afteriFrame").style.left = "0%";
                document.getElementById("afteriFrame").style.top = "0%";
                document.getElementById("afteriFrame").style.borderRadius = "0%";
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
                document.getElementById("afteriFrame").style.width = "100%";
                document.getElementById("afteriFrame").style.height = "100%";
                document.getElementById("afteriFrame").style.left = "0%";
                document.getElementById("afteriFrame").style.top = "0%";
                document.getElementById("afteriFrame").style.borderRadius = "0%";
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
                document.getElementById("afteriFrame").style.width = "100%";
                document.getElementById("afteriFrame").style.height = "100%";
                document.getElementById("afteriFrame").style.left = "0%";
                document.getElementById("afteriFrame").style.top = "0%";
                document.getElementById("afteriFrame").style.borderRadius = "0%";
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
                document.getElementById("afteriFrame").style.width = "100%";
                document.getElementById("afteriFrame").style.height = "100%";
                document.getElementById("afteriFrame").style.left = "0%";
                document.getElementById("afteriFrame").style.top = "0%";
                document.getElementById("afteriFrame").style.borderRadius = "0%";
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
                document.getElementById("afteriFrame").style.width = "100%";
                document.getElementById("afteriFrame").style.height = "100%";
                document.getElementById("afteriFrame").style.left = "0%";
                document.getElementById("afteriFrame").style.top = "0%";
                document.getElementById("afteriFrame").style.borderRadius = "0%";
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
                document.getElementById("afteriFrame").style.width = "100%";
                document.getElementById("afteriFrame").style.height = "100%";
                document.getElementById("afteriFrame").style.left = "0%";
                document.getElementById("afteriFrame").style.top = "0%";
                document.getElementById("afteriFrame").style.borderRadius = "0%";
            }

        }
    }
}

/* Hot! Instructions 🔥 */
/*---!Important call finction showInstruct(needInstruct,textInstruct);
* Where needInstruct (to show important instructions value = true/false)
*       textInstruct (Text to show) = text
* */

/*Test program*/
/*var needInstruct = false;
var textInstruct ;
function runInstruct() {
    needInstruct = true;
    textInstruct = "I did a program";
    showInstruct(needInstruct,textInstruct);
}*/
function showInstruct(needInstruct,textInstruct) {
    if (needInstruct === true){
        document.querySelector("#instructions").style.boxShadow="0px 0px 10px rgba(242, 0, 0, 0.7)";
        document.querySelector("#instructions").innerHTML=textInstruct;
        setInterval(function (args) {
            document.querySelector("#instructions").style.boxShadow="0px 0px 10px rgba(242, 242, 0, 0.7)";
            document.querySelector("#instructions").style.border="1px solid rgba(242, 242, 0, 0.7)";
        },3000)
        setInterval(function (args) {
            document.querySelector("#instructions").style.boxShadow="0px 0px 10px rgba(242, 0, 0, 0.7)";
            document.querySelector("#instructions").style.border="1px solid rgba(242, 0, 0, 0.7)";
        },2000)

    }else if(needInstruct === false && textInstruct)
    {
        document.querySelector("#instructions").style.boxShadow="0px 0px 5px rgba(242, 242, 0, 0.7)";
        document.querySelector("#instructions").innerHTML=textInstruct;
    }

}
quotes=["Cleanliness is next to goldiness.","Be the change you want to see in the world.","Everyone must be his own scavenger.","Live life cleaner,make earth greener.","Cleanliness starts from your home.","Green city,clean city,my dream city."]

setInterval(function(){
    showInstruct(false,quotes[Math.floor(Math.random()*6)]);
}, 10000);
/* Hot! Instructions 🔥  end*/
//plane change
    setInterval(function(){ 
    $("#planeimg").attr("src","assets/temporary/Backgrounds/planes/plane3.png");
    $("#planeimg").css("height","80px");
    $("#planeimg").css("width","200px");
        setInterval(function(){ 
        $("#planeimg").attr("src","assets/temporary/Backgrounds/planes/plane1.png");
           $("#planeimg").css("height","50px");
           $("#planeimg").css("width","200px");
        }, 35000);
    }, 35000);

function popup() {
  if(sessionStorage.getItem("view")!="1"){
    document.querySelector("#mainOverlay").style.height="100%";
    document.querySelector("#subOverlay").style.height="70%";
    document.querySelector("#subOverlay").style.padding="15px";
  }else{
    document.querySelector("#closeBtn").style.display="none";
    navHandelClick();
  }

}
function closePop(){
    document.querySelector("#mainOverlay").style.height="0%";
    document.querySelector("#subOverlay").style.height="0%";
    document.querySelector("#subOverlay").style.padding="0px";
    document.querySelector("#closeBtn").style.display="none";
    setTimeout(navHandelClick, 1600);
    sessionStorage.setItem("view", "1");
    //auto close menu on loading page

}
/*preloader js*/
function loadingComplete(){
   $(".preloader").css({"-webkit-animation":"slit-out-horizontal 1s ease-in both","animation":"slit-out-horizontal 1s ease-in both"}); 
}
/*help*/
helpopen=0;
function showhelp(){
  if(helpopen==0){helpopen=1;
  $(".helpmsg").css({"width":"100px","height":"100px","padding":"13px"});
    setTimeout(function(){
      $(".helpmsg").css({"width":"0px","height":"0px","padding":"0px"});
      helpopen=0;
    },10000);
  }else if(helpopen==1){
    $(".helpmsg").css({"width":"0px","height":"0px","padding":"0px"});
    helpopen=0;
  }
}

function showalert(msg){

  $("#notice").css({"height": "130px","padding": "15px"});
  $("#notice").html(msg);
  setTimeout(function(){
    $("#notice").css({"height": "0px","padding": "0px"});
    $("#notice").html("");
  },3000);
}