
    window.onload = function(){
    var logo = document.getElementById("myloading");
    var logo1 = document.getElementById("myLogo1");
    var logo2 = document.getElementById("myLogo2");
    TweenMax.from(logo, 2, {borderColor: "yellow",boxShadow: "0 0 100px yellow",repeat: -1,ease: SlowMo.easeOut,rotation:-360, scale:0.5});
    TweenMax.from(logo1, 2, {borderColor: "red",boxShadow: "0 0 100px red",repeat: 0,yoyo: true,ease: SlowMo.easeOut,rotation:0, scale:0.5});
    TweenMax.from(logo2, 2, {borderColor: "blue",boxShadow: "0 0 100px blue",repeat: 0,yoyo: true,ease: Bounce.easeOut,rotation:0, scale:0.5});
   

}
   


