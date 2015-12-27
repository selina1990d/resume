/**
 * Created by dpp on 2015/12/24.
 */
var main=document.querySelector("#main");
var oLis=document.querySelectorAll(".slide>li");
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
var desW=640;
var desH=960;

if(desW/desH<winW/winH){
    main.style.webkitTransform="scale("+winW/desW+")";
}else{
    main.style.webkitTransform="scale("+winH/desH+")";
}
[].forEach.call(oLis,function(){
    arguments[0].index=arguments[1];
    arguments[0].addEventListener("touchstart",start,false);
    arguments[0].addEventListener("touchmove",move,false);
    arguments[0].addEventListener("touchend",end,false);
});
function fnInit(){
	oLis[0].firstElementChild.id="a1";
	}
	setTimeout(fnInit,1000);
function start(e){
    this.start= e.changedTouches[0].pageY;
}
function move(e){
    e.preventDefault();
    this.flag=true;
    var cur=this.index;
    var step=1/2;
    var moveTouch=e.changedTouches[0].pageY;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur){
            arguments[0].style.display="none";
        }
        arguments[0].className="";
        arguments[0].firstElementChild.id="";
    })

    var changePos=moveTouch-this.start;
    if(changePos>0){//ÏòÏÂ»¬
        var pos=-winH+changePos;
        this.prevIndex=cur===0?oLis.length-1:cur-1;
    }
    if(changePos<0){
        var pos=winH+changePos;
        this.prevIndex=cur===oLis.length-1?0:cur+1;
    }
    oLis[this.prevIndex].style.webkitTransform="translate(0,"+pos+"px)";
    oLis[this.prevIndex].style.display="block";
    oLis[this.prevIndex].className="zIndex";
   oLis[cur].style.webkitTransform="scale("+(1-Math.abs(changePos/winH)*step)+") translate(0,"+changePos+"px)";
}
function end(e){
    if(this.flag){
        oLis[this.prevIndex].style.webkitTransform="translate(0,0)";
        oLis[this.prevIndex].style.webkitTransition="0.5s";
        oLis[this.prevIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition ="";
            this.firstElementChild.id="a"+(this.index+1);
        },false);
    }
}


