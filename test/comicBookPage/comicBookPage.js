$(document).ready(init);

function init(){
	enlargeButton1();
	enlargeButton2();
	buttonColor1();
	buttonColor2();
	lightningArray();
	
	
	
	window.addEventListener('resize', resizer, false);


	var page1 = pageFactory([boxFactory("box1","#000"), boxFactory("box2","#fff"), boxFactory("box3","#000"),boxFactory("box4","#000")]);
}


function pageFactory(boxes){
	var obj = {};
	obj.boxes = boxes;
	currentBox = null;

	obj.loadNext = function(){
		if(getLastBox() < obj.boxes.length - 1) obj.boxes[getLastBox()+1].show();
	};

	obj.loadPrev = function(){
		if(getLastBox() >= 0) obj.boxes[getLastBox()].hide();
	};

	function getLastBox(){
		var last_i = -1;
		for(var i = 0; i < obj.boxes.length; i++)
			 if(obj.boxes[i].isShowing) last_i = i;
				resizer();
				paintSky();

		return last_i;
	}

	$('.button1').click(obj.loadNext);
	$('.button2').click(obj.loadPrev);

	return obj;
}

function boxFactory(id,backgroundColor){
	var obj = {};
	if($('#'+id).length) obj.element=$("#"+id);
	else {
		$('.strips').append("<canvas id='" + id +"'></canvas>");
		obj.element=$("#"+id);
	}

	obj.backgroundColor=backgroundColor;
	obj.element.css("background-color",obj.backgroundColor);
	obj.scenes = getScenes();
	obj.isAnimating = false;
	obj.isShowing = false;
	obj.element.addClass('box');
	obj.show = function(){
		if(!obj.isAnimating){
			obj.isShowing = true;
			obj.isAnimating = true;
			currentBox = obj;
			TweenLite.fromTo(obj.element,1,{opacity:0,scale:0},{opacity:1,display:'block',scale:1,rotation:"360deg", onComplete:scaleScenes});
;
		}
	}

	obj.hide = function(){
		console.log(obj.isAnimating);
		if(!obj.isAnimating){
			obj.isAnimating = true;
			obj.isShowing = false;
			TweenLite.to(obj.element,1, {scale: 0, rotation:"-360deg",onComplete:unscaleScenes});
		}
	}

	function scaleScenes(){
		for(var i = 0; i < obj.scenes.length; i++){
			scaleScene(obj.scenes[i]);
		}
		obj.isAnimating = false;
	}

	function unscaleScenes(){
		for(var i = 0; i < obj.scenes.length; i++){
			unscaleScene(obj.scenes[i]);
		}	
		obj.isAnimating = false;
		
	}

	function scaleScene(scene) {
	    var ratio = scene.height()/obj.element.height();
	    scene.children('img').each(function(i){
	    	$(this).height($(this).height()*ratio);
	    	TweenLite.fromTo($(this),1,{opacity:0},{opacity:1, onComplete:obj.isAnimating=false});
	});
	}

	function unscaleScene(scene) {
	    var ratio = scene.height()/obj.element.height();
	    scene.children('img').each(function(i){
	    	$(this).height($(this).height()/ratio);
	    	TweenLite.fromTo($(this),1,{opacity:1},{opacity:0, onComplete:obj.isAnimating=false});
	});
	}
	function getScenes(){
		var scenes = [];
		obj.element.children('div').each(function(i,element){
			scenes.push($(element));
		});
		console.log(scenes);
		return scenes;
	}

	obj.id= id;
	return obj;


}


function enlargeButton1(){
var $button1= $('.button1');
$button1.hover(
 function() {
 TweenLite.to($(this), 1, {scale:1.5});
 },
   function() {
      TweenLite.to($(this), 0.5, {scale:1});  
   }
)}; 
function enlargeButton2(){
var $button1= $('.button2');
$button1.hover(
 function() {
 TweenLite.to($(this), 1, {scale:1.5});
 },
   function() {
      TweenLite.to($(this), 0.5, {scale:1});  
   }
)};
function buttonColor1(){
	var $button1= $('.button1');
	$button1.hover(
		function(){
		TweenLite.to($(this),1, {backgroundColor:'black', borderColor:'#eee',color:'white'});
	},
		function(){
			TweenLite.to($(this), 0.5, {backgroundColor:'#eee',borderColor:'black',color:'black'});
		});
}
function buttonColor2(){
	var $button2= $('.button2');
	$button2.hover(
		function(){
		TweenLite.to($(this),1, {backgroundColor:'black', borderColor:'#eee',color:'white'});
	},
		function(){
			TweenLite.to($(this), 0.5, {backgroundColor:'#eee',borderColor:'black',color:'black'});
		});
}


var window_width = window.innerWidth * 1.5;
var window_height = window.innerHeight * 1.5;

var fall_speed = 0.7;
var wind_speed = 5;

var rain_weight = 0.11;
var rain_color = '255,255,255';

var drop_count;
var drops = [];


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.msRequestAnimationFrame     ||
          window.oRequestAnimationFrame      ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function randomFrom(min, max) {
  return (Math.random() * (max - min) + min);
}

function resizer() {
  var canvas =document.getElementById('sky');

  window_width = window.innerWidth * 1.5;
  window_height = window.innerHeight * 1.5;
  drop_count = window_width * rain_weight;
  
  canvas.setAttribute('width', window_width);
  canvas.setAttribute('height', window_height);
}




function paintSky() {
  for (var i = 0; i < drop_count; i++) {
    drops[i] = new drop();
    drops[i].reset();
  }
  
  rain();
}

function rain() {
  var canvas= document.getElementById('sky');
  var sky= canvas.getContext('2d');
  sky.clearRect(0, 0, window_width, window_height);

  var drops_length = drops.length;

  for (var i = 0; i < drops_length; i++) {
    var drop = drops[i];
    drop.fall();
    drop.draw(sky);
  }

  window.requestAnimFrame(rain);
}

function drop() {
  this.reset = function() {
    this.r = randomFrom(0.8, 1.6);
    this.l = (this.r * 250);
    this.x = randomFrom((window_width * -0.25), (window_width * 1.125));
    this.y = randomFrom((window_height * -0.25), (window_height * -1));
    this.dx = randomFrom((wind_speed - 3), (wind_speed + 3));
    this.dy = (this.r * (100 * fall_speed));
    this.offset = (this.l * (this.dx / this.dy));
    this.opacity = (this.r * randomFrom(0.2, 0.6));
    this.drip = this.render();
  };
  
  this.render = function() {
    var canv = document.createElement('canvas');
    var ctx = canv.getContext('2d');
    canv.setAttribute('width', Math.abs(this.offset) + this.r);
    canv.setAttribute('height', this.l);
    
    ctx.beginPath();
    
    var drip = ctx.createLinearGradient(0, 0, 0, this.l);
    drip.addColorStop(0, 'rgba(' + rain_color + ', 0)');
    drip.addColorStop(1, 'rgba(' + rain_color + ', ' + this.opacity + ')');
    ctx.fillStyle = drip;
        
    //sky.rect(this.x, this.y, this.r, this.l);
    var startX = (this.offset >= 0) ? 0 : Math.abs(this.offset);
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX + this.r, 0);
    ctx.lineTo(startX + this.r + this.offset, this.l);
    ctx.lineTo(startX + this.offset, this.l);

    ctx.closePath();
    ctx.fill();
    
    return canv;
  };
  
  this.draw = function(sky) {
    
    sky.drawImage(this.drip, this.x, this.y);
  };
  
  this.fall = function() {
    this.x += this.dx;
    this.y += this.dy;
    
    if (this.y > (window_height * 1.25)) {
      this.reset();
    }
  };
}

function lightningArray(){
	var randTime = Math.random()*5000;
	lightning();
	setTimeout(lightningArray,randTime);
}

function lightning(){
var strikeNumber = Math.random()*5+1;
var strikeDelay = Math.random()*.3;
for(var i = 0; i < strikeNumber; i++){
	TweenMax.fromTo(box1, .1,{backgroundColor:"#000",delay: strikeDelay},{backgroundColor:"#fff",onComplete:function blah(){
		TweenMax.fromTo(box1,.18,{backgroundColor:"#fff"},{backgroundColor:"#000"});
		TweenMax.fromTo(scene1, .05,{opacity:1,delay:strikeDelay},{opacity:0,onComplete:function blah2(){
			TweenMax.fromTo(scene1,.18,{opacity:0},{opacity:1});
		}});
}});
}
}
jQuery(document).ready(function($){
        $('#Parallax').mousemove(
                function(e){
                /* Work out mouse position */
                var offset = $(this).offset();
                var xPos = e.pageX - offset.left;
                var yPos = e.pageY - offset.top;
 
                /* Get per­cent­age positions */
                var mouseXPercent = Math.round(xPos / $(this).width() * 100);
                var mouseYPercent = Math.round(yPos / $(this).height() * 100);
 
                /* Pos­i­tion Each Layer */
                $(this).children('img').each(
                        function(){
                                var diffX = $('#Parallax').width() - $(this).width();
                                var diffY = $('#Parallax').height() - $(this).height();
       
                                var myX = diffX * (mouseXPercent / 100);
                                var myY = diffY * (mouseYPercent / 100);
                                var cssObj = {
                                        'left': myX + 'px',
                                        'top': myY + 'px'
                                }
                                $(this).animate({left: myX, top: myY},{duration: 50, queue: false, easing: 'linear'});
 
                        }
                );
 
                }
        );
});









