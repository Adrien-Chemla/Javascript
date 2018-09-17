# Variables JavaScript
camelCase.
English.
First letter caps are for class : const CreateObject = {};
Avoid unclear initials : let n1 = 1; let n2 = 2;

## Variables ECMAScript5 and < - (deprecated)
var is not block scopded.

``` javascript
//Example var
var text = "text";
console.log(text === "text"); //true

var number = 5;
console.log(number === 5); //true
console.log(number == "5"); //true
```

``` javascript
//Example : global scope
var text = "init";
if(text === "init){
	var text = "update";
	console.log(text); //update
}
console.log(text); //update
```

## variables ECMAScript6 and >
let/const are block scopded.
let can be reassign.
const can't be.

``` javascript
//let variables
let array = [1,2];
console.log(array); //1,2
array = [1,2,3];
console.log(array); //1,2,3
```

``` javascript
//const variables
const text = "text";
console.log(text); //text
text = "new text"; //assignment Error
```

``` javascript
//block scope
let text = "init";
if(text === "init){
	let text = "update";
	console.log(text); //update
}
console.log(text); //init
```