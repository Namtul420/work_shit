var http = require('http');
var bl = require('bl');

var count = 0;
var totalData = ['a','b','c'];

http.get(process.argv[2], new callback(0));
http.get(process.argv[3], new callback(1));
http.get(process.argv[4], new callback(2));

function callback(id){
	return function(response){
		response.pipe(bl( function(err,data){
				count++;
				totalData[id] = data.toString();
				if(count == 3) printData();
			}));
	


	};
}


// function callback0(response){
// 	response.pipe(bl( function(err,data){
// 		count++;
// 		totalData[0] = data;
// 		if(count == 2) printData();
// 	}));
// }


// function callback1(response){
// 	response.pipe(bl( function(err,data){
// 		count++;
// 		totalData[1] = data;
// 		if(count == 2) printData();
// 	}));
// }

// function callback2(response){
// 	response.pipe(bl( function(err,data){
// 		count++;
// 		totalData[2] = data;
// 		if(count == 2) printData();
// 	}));
// }

	function printData(){
		for(var i = 0; i < totalData.length; i++) console.log(totalData[i]);
	}
