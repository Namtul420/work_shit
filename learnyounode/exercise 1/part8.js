var http = require('http');

http.get(process.argv[2], callback);

function callback(response){
	response.setEncoding('utf8');
	var totalData = "";
	response.on('data', function(data){
		totalData += data;
	});

	response.on('error', function(err){
		//console.log(err);
	});

	response.on('end', function(){
		console.log(totalData.length);
		console.log(totalData);
	})
}
