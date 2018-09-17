# Operators
## equal
"==" and "!=" will compare if values are equal or not.
"===" and "!==" will compare if both values AND types are equal or not.
So when comparing 2 values, always use the "===" operator.

```javascript
//Exemples
let number = 5;
let text = "5";
number == text; //return true
number === text; //return false

//Some exceptions
null == undefined; //return true
null === undefined; //return false

NaN === NaN; //return false - NaN (not a number) is still a Number
```

## Superior
JavaScript converts text into number
let number = 5;
let text = "5";
console.log(number > 2); //return true
console.log(number > 6); //return false
console.log(text > "2"); //return true
console.log(number >= 5); //return true

## Inferior
if( < ){
JavaScript converts text into number
let number = 5;
let text = "5";
console.log(number < 2); //return false
console.log(number < 6); //return true
console.log(text < "2"); //return false
console.log(number <= 5); //return true
}

## truthy / falsy
if(condition){}; //test if condition return true
```javascript
let truthy = true;
if(truthy){
	console.log("it's true !");
}else{
	console.log("it's false !");
};
//return "it's true !"
```

if(!variable){}; //test if condition return false
```javascript
let truthy = true;
if(!truthy){
	console.log("it's true !");
}else{
	console.log("it's false !");
};
//return "it's false !"
```

## conditions
if() will test if conditions between parentheses are true.
Comparator,Truthy/Falthy,HTML objects,...

### And
All conditions should be true.

let condition1 = 10;
let condition2 = true;
if(condition1 === 10 && condition2){
	//code will execute
}

### Or
only 1 condition should be true

let condition1 = 10;
let condition2 = true;
if(condition1 === 5 || condition2){
	//code will still execute
}

### Functions result
function truthyFalsy(){
	return false;
}
let functionResult = truthyFalsy();
if(functionResult){
	//code will not execute
}

### Imbricate
let condition1a = 10;
let condition1b = true;
let condition2a = "text";
let condition2b = true;
if( (condition1a > 20 || condition1b) && (condition2a.search("ex") != -1 || !conditionb) ){
	//...
}
