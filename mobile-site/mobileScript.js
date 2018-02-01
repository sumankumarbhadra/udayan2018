
var navFlag = false;
function showNav() {

    if (navFlag === false) {
        document.querySelector("#mainNav").style.height = "100%";
        return navFlag = true;

    }else  if(navFlag === true)
        {
            document.querySelector("#mainNav").style.height = "0%";
            return navFlag = false;
        }
}