var fs = require('fs');
var path = process.argv[2];
var splitUp;
var myBufferString;
fs.readFile(path,myCallbackFunction);


function myCallbackFunction(whatevs,data){
	myBufferString = data.toString();
	splitUp = myBufferString.split('\n');
	console.log(splitUp.length-1);
}


