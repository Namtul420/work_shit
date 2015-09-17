var fs = require('fs');
var path = process.argv[2];

var mybuffer = fs.readFileSync(path);
var myBufferString = mybuffer.toString();
var splitUp = myBufferString.split('\n');

console.log(splitUp.length-1);