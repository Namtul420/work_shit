var fs = require('fs');
var p = require('path');
var path = process.argv[2];
var ext = process.argv[3];

fs.readdir(path,callback);

function callback(err,data){
	for(var i = 0; i < data.length; i++) {
		if(p.extname(data[i]) == "."+ext) console.log(data[i]);
	};
}
