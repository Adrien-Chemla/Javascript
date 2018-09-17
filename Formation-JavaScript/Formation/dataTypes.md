# Data types
There are actually 8 data types in JavaScript divided in primitive data and complex data.

## Primitive Data
A primitive data is a data which is not an object and which have no method.
- Boolean
- Null
- Number
- String
- Symbol (ECMAScript 6)
- Undefined

## Complexe Data
- Function
- Object

All existing JavaScript values will have one of thee data types.

## Typeof
To detect the type of a value, you can use the typeof method. But here again we have exceptions and need to be careful.

```javascript
//Exemples
typeof 5; //return "number"

let number = 5;
typeof number; //return "number"

let text = "5";
typeof text; //return "string"

let functionName = function(){};
typeof functionName; //return "function"
typeof Array; //return "function"
typeof Map; //return "function"

//Exceptions
let dataNull = null;
typeof dataNull; //return "object"
typeof object; //return "object" too
//solution to test an object :
//Object(x) === x > return true only for objects;
let dataObject = {};
let dataNull = null;
Object(dataObject) === dataObject; //return true
Object(dataNull) === dataNull; //return false
//solution to test null :
let dataNull = null;
dataNull === null; //return true

typeof NaN; //return "number"
//solution to test if NaN :
let notNumber = NaN;
Number.isNan(notNumber); //return true
```

[typeof list](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/L_op%C3%A9rateur_typeof)
