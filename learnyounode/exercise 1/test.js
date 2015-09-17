var myArray = [];
var count = 0;

new myFunction()();
new myFunction()();
new myFunction()();

console.log(myArray);
function myFunction(){
	return function(){
		myArray.push(count);
		count++;
	}
}