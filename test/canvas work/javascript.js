document.getElementsByTagName('body')[0].onload = start;
var canvas = null;
var ctx = null;




	function square(x,y,size){
	ctx.moveTo(x,y);
	ctx.moveTo(x-size,y+size);
	ctx.lineTo(x-size,y-size);
	ctx.lineTo(x+size,y-size);
	ctx.lineTo(x+size,y+size);
	ctx.lineTo(x-size,y+size);

	ctx.stroke();

	}

	function triangle(x,y,size){
		ctx.moveTo(x,y);
		ctx.moveTo(x,y+size);
		ctx.lineTo(x-size,y-size);
		ctx.lineTo(x+size,y-size);
		ctx.lineTo(x,y+size);
		ctx.stroke();
	}



	function drawSquareRow(xStart,y,n,size){
		var x = xStart;
		for(var i = 0; i < n; i++){
			square(x,y,size);
			x += 3*size;
		}
	}

	function drawSquareGrid(xStart,yStart,rows,columns,size){
		var y = yStart;
		for(var i = 0; i < rows/2; i++){
			drawSquareRow(xStart,y,columns,size);
			drawSquareRow(xStart + 1.5*size,y + 3*size,columns,size);
			y += 6*size;
		}
	}

	function drawRow(xStart,y,n,size,shape){
	var x = xStart;
		for(var i = 0; i < n; i++){
			shape(x,y,size);
			x += 3*size;
		}	
	}

	function drawGrid(xStart,yStart,rows,columns,size,shape){
	var y = yStart;
	for(var i = 0; i < rows/2; i++){
		drawRow(xStart,y,columns,size,shape);
		drawRow(xStart + 1.5*size,y + 3*size,columns,size,shape);
		y += 6*size;
	}
}

function start(){
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
drawGrid(0,0,10,10,50,triangle);
drawGrid(0,0,10,10,50,square);

//polygon();
}




function polygon() {
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");




// 



// defines size

// 

var radius = 50;

var xc = 0;
var yc = 0;
// rotates shape
var theta = 0;
// defines number of sides
var n = 6;
	for(var j = 0; j < 5; j++) {
  		for(var k = 0; k < 5; k++) {
			for(var i = 0; i < n; i++){
				xc = 150*k;
				yc = 150*j;
				var x = radius*Math.sin(theta) + xc;
				var y = radius*Math.cos(theta) + yc;
				ctx.moveTo(x,y);
				theta += 2*Math.PI/n;
				var x = radius*Math.sin(theta) + xc;
				var y = radius*Math.cos(theta) + yc;
				ctx.lineTo(x,y);
				ctx.fillStyle = "#DAA520";
				ctx.stroke();
	
}
}
}
};
 