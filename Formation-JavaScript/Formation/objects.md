# Objects
JavaScript is object-based.
Object = Collection of properties (key : value) and methods (functions).

const object = {
	key: value, //property
	function: function(){} //method
};

## manage properties
const object = {
    property1: 1,
    property2: "2nd propery"
};

console.log(object);

object.property3 = {
	prop: ["1","2","3"]
}
console.log(object);
/*
object = {
    property1: 1,
    property2: "2nd propery",
	property3: {
        prop: ["1","2","3"]
	}
};
*/

loop on object properties
var result = '';
for (var prop in object) {
	if (object.hasOwnProperty(prop)) {
		result += prop + ":" + object[prop] + '\n';
	}
}
console.log(result);
/*
property1:1
property2:2nd property
property3:["1","2","3"]
*/


## manage methods
object.property3.method = function(){
	return 3;
}
console.log(object);
/*
object = {
    property1: 1,
    property2: "2nd propery",
	property3: {
        prop: ["1","2","3"],
		method: function(){
			return 3;
		}
	}
};
*/

object["property4"] = true;
console.log(object);
/*
object = {
    property1: 1,
    property2: "2nd propery",
	property3: {
        prop: ["1","2","3"],
		method: function(){
			return 3;
		}
	},
	property4: true
};
*/

console.log(object.property1); // 1
console.log(object["property2"]); // "2nd property"
console.log(object.property3.method); // "function method()"
console.log( object.property3.method() ); // 3
console.log(Object.keys(object)); // ["property1","property2","property3","property4"]
console.log(Object.entries(object)); // [["property1","1"],["property2","2nd property"],["property3","{prop:["1","2","3"],method:function(){return 3;}}"],["property4","true"]];

delete object.property4;
console.log(object);
/*
object = {
    property1: 1,
    property2: "2nd propery",
	property3: {
        prop: ["1","2","3"],
		method: function(){
			return 3;
		}
	}
};
*/

## prototypes
A prototype is the object from which an object is created.

let newOjbect = Object.create(object);
object is the prototype of newObject.
newObject and will always inherit all properties & methods from object.

console.log(newOjbect);
/*
__proto__ :
newObject = {
    property1: 1,
    property2: "2nd propery",
	property3: {
        prop: ["1","2","3"],
		method: function(){
			return 3;
		}
	}
};
*/

object.property5 = "newProperty";
console.log(newObject);
/*
__proto__ :
newObject = {
    property1: 1,
    property2: "2nd propery",
	property3: {
        prop: ["1","2","3"],
		method: function(){
			return 3;
		}
	},
	property5: "newProperty"
};
*/

## create new objects
Constructor = Class.
Start with a caps.

### with functions
No need to instanciate properties.
Easy to create new objects.
Need to use 'prototype' to add properties inherited by oject instances.
const Character = function(attack,defense,life,type,faction){
	this.attack = attack;
	this.defense = defense;
	this.life = life;
	this.type = type;
	this.faction = faction;
};
let heroe = new Character(1, 2, 5, "warrior","heroes");
let monster = new Character(2, 1, 2, "monster","ennemies");

Character.name = "unknown";
console.log(heroe.name); //undefined

Character.prototype.name = "unknown";
console.log(heroe.name); //unknown

### with objects
Automatically inherit new properties added to the object
const Character = {
	attack : 1,
	defense : 0,
	life : 1,
	type : undefined,
	faction: 'unknown'
};

let heroe = Object.create(Character);
heroe.attack = 1;
heroe.defense = 2;
heroe.life = 5;
heroe.type = "warrior";
heroe.faction = "heroes";

let monster = Object.create(Character);
heroe.attack = 2;
heroe.defense = 1;
heroe.life = 2;
heroe.type = "monster";
heroe.faction = "ennemies";
