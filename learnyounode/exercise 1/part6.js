var myThing = require('./part6_module.js');

var path = process.argv[2];
var ext = process.argv[3];
myThing(path,ext,result);

function result(err,data){
	if(!err) for(var i = 0; i < data.length; i++) console.log(data[i]);
	else {
		console.log('dag yo!  an error!');
		console.log(err);
		}
}