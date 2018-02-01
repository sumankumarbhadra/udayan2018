
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