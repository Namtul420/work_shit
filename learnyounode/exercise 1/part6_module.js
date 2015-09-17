module.exports = function(path,ext,callbackOuter){

if(!path) callbackOuter('no path', null);
else if(!ext) callbackOuter('no ext', null);
else {
	var fs = require('fs');
	var p = require('path');
	fs.readdir(path,callback);

	function callback(err,data){
		var result = [];
		if(err) callbackOuter(err,null);
		else{
			for(var i = 0; i < data.length; i++) {
				if(p.extname(data[i]) == "."+ext) result.push(data[i]);
				};

			callbackOuter(err,result);
		}
	}
}



}

