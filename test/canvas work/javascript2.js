document.getElementsByTagName("body")[0].onload = start;
var canvas = null;
var ctx = null;
var polygons = [];
var newPolygons = [];

function start(){
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
        rows(100,100,10,6,6,100,'gold',true);
		console.log(polygons);





 function writeMessage(myCanvas, message) {
        var context = canvas.getContext('2d');

        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        
        for(var i = 0; i < polygons.length; i++) {
        	var p = polygons[i];
        	polygon(p.x,p.y,6,100,'gold',false);

        	}

        for(var i = 0; i < newPolygons.length; i++) {
        	var p = newPolygons[i];
        	
        	polygon(p.x,p.y,6,90,'black',false);

        	}

        context.font = '18pt Calibri';
        context.fillStyle = 'white';
        context.fillText(message, 10, 25);

        
 
      }
 function getMousePos(myCanvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };

      }

 canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(myCanvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(myCanvas, message);
      }, false);

}

document.onclick=function(event){
	console.log(event.offsetX);
	console.log(event.offsetY);
	var coord = {
		x:event.offsetX,
		y:event.offsetY,
	}
	//newPolygons.push(coord);
	
	var minDistance = 100000;
	var minIndex = -1;
	for(var i = 0; i < polygons.length; i++) {
			if(findDistance(coord,i) < minDistance) {
				minIndex = i;
				minDistance = findDistance(coord,i);
			}
				}
	console.log(minIndex);
	var newCoord = {
		x:polygons[minIndex].x,
		y:polygons[minIndex].y,
	}
	newPolygons.push(newCoord);
	//polygon(polygons[0].x,polygons[0].y,6,90,'yellow');

}


function findDistance(coord,polygonIndex){
	var dist = Math.sqrt( Math.pow(coord.x-polygons[polygonIndex].x,2) + Math.pow(coord.y-polygons[polygonIndex].y,2) );
	return dist;
}

function row (xc,yc,nCol,n,size,color_in,save_in){
	for(var i = 0; i < nCol; i++){
	polygon(xc,yc,n,size,color_in,save_in);
	xc += 2*size*Math.cos(Math.PI/n);

}
}
function rows (xc,yc,nCol,nRows,n,size,color_in,save_in){
	var save = save_in;
	var color = color_in || 'gold';
	var coord = {
		x: xc,
		y: yc,
	};

	for(var i = 0; i < nRows; i++){
		row(xc,yc,nCol,n,size,color_in,save);
		row(xc+size*Math.cos(Math.PI/n),yc+size*Math.sin(Math.PI/n) + size,nCol,n,size,color_in,save);
		yc += 2*(size*Math.sin(Math.PI/n) + size);
}
}

var theta = 0;
var n = 0;
function polygon(xc,yc,n,size,color_in,save_in){
	var save = save_in;
	var color = color_in || 'gold';
	var coord = {
		x: xc,
		y: yc,
	};
	if(save) polygons.push(coord);

		ctx.beginPath();
		var x = size*Math.sin(theta) + xc;
		var y = size*Math.cos(theta) + yc;
		ctx.moveTo(x,y);

		for(var i = 0; i < n; i++){
			


			theta += 2*Math.PI/n;
			 x = size*Math.sin(theta) + xc;
			 y = size*Math.cos(theta) + yc;
			ctx.lineTo(x,y);
			
}
ctx.closePath();

ctx.stroke();		
ctx.fillStyle = color;
ctx.fill();
}






