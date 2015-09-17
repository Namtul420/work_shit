var net = require('net');
var server = net.createServer(myCallback);
var port = process.argv[2];

server.listen(port);

function myCallback(socket){
var output = "";
var currentTime = new Date();
output += currentTime.getFullYear();
output += "-";
output += pad(currentTime.getMonth() + 1);
output += "-";
output += pad(currentTime.getDate());
output += " ";
output += currentTime.getHours();
output += ":";
output += currentTime.getMinutes();
output += "\n";

socket.write(output);
socket.end();
};

function pad(x){
	if(x < 10) return "0"+x;
	else return ""+x;
}