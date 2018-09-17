# Scope

## functions
let globalVariable = "global";
let scopeOutside = function(){
	let outsideVariable = "outside";
	let scopeInside = function(){
		let insideVariable = "inside";
		console.log(globalVariable); //return "global"
		console.log(outsideVariable); //return "outside"
		console.log(insideVariable); //return "inside"
	}
	scopeInside();
	console.log(globalVariable); //return "global"
	console.log(outsideVariable); //return "outside"
	console.log(insideVariable); //throw an error "insideVariable is not defined"
}
scopeOutside();

### Exercices
How to pass the insideVariable in the outside Scope ?

## variables
let superHero = "SuperMan"; //variable global
let callHelp = function(heroName){
	return function(){
		//heroName = superHero at the time the function is stored in a variable
		console.log("It's " + heroName);
	}
}
let callSuperHero = callHelp(superHero);
callSuperHero(); //return "It's SuperMan"

superHero = "JavaScript Man"; //update global variable
callSuperHero(); //still return "It's SuperMan"
callHelp(superHero); //return "It's JavaScript Man"

## asynchronous
let superHero = "SuperMan"; //variable global

setTimeout(function(){
	console.log(superHero); // will not return "SuperMan"
},1000);

superHero = "JavaScript Man";

### Exercices
How to return both "SuperMan" and "JavaScript Man" after 1s ?

## this
```javascript
"use strict";
let objectGlobalScope = {
	a: this,
	bScope: {
		c: this,
		bFunctionScope: function(){
			return this;
		},
		dScope: {
			e: this,
			dFunctionScope: function(){
				return this;
			}
		}
	}
};

console.log(objectGlobalScope.a); //return window
console.log(objectGlobalScope.bScope.c); //return window
console.log(objectGlobalScope.bScope.bFunctionScope()); //return bScope object
console.log(objectGlobalScope.bScope.dScope.e); //return window
console.log(objectGlobalScope.bScope.dScope.dFunctionScope()); //return dScope object
```
