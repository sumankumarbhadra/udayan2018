//function for document on ready event
$(document).ready(function(){
var navWidth;
var navFlag = true;
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

//Hover 
TweenMax.to($drone, 5, {delay:$delay, y:"-300px", ease:Linear.easeInOut, repeat:-1, yoyo:true});

//Shadow
// TweenMax.to(shadow, 5, {delay: $delay, scaleX:".2", x:"40%", opacity:".01", ease:Linear.easeInOut, repeat:-1, yoyo:true});

//Lights
TweenMax.to(light1, .5, {opacity:".7", ease:Power2.easeNone, repeat:-1, yoyo:true});

TweenMax.to(light2, .5, {opacity:".7", ease:Power2.easeNone, repeat:-1, yoyo:true});

function rotateBladeLeft(blade, speed) {
var spin = "230px";
TweenMax.to(blade, speed, {x:spin, scaleX:".1", ease:Power2.easeNone, repeat:-1, yoyo:true});
}

function rotateBladeRight(blade, speed) {
var spin = "-35px";
TweenMax.to(blade, speed, {x:spin, scaleX:".1", ease:Power2.easeNone, repeat:-1, yoyo:true});
}
});
