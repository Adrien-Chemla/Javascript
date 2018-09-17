# Calculate
let number1 = 10;
let number 2 = 5;

Same logic as per mathematics.
console.log(1+10*10); //return 101
console.log((1+10)*10); //return 110

## parseFloat
transform string into decimal.
Only first number.
Don't work if text first.

console.log(parseFloat("10.100")); // return 10.1
console.log(parseFloat("500 dollars")); // return 500
console.log(parseFloat("dollars 500")); // return NaN

## parseInt
transform string into integer.
Can specify the numeral system.

console.log(parseInt("10.100")); // return 10
parseInt("10010101001", 2); // binary code, return 1193

## Addition
let addition = number1 + number2; //expected output : 15
addition++; //will increment by 1

## Substract
let substract = number2 - number1; //expected output : -5
substract++; //will decrement by 1

## Multiply
let multiply = number1 * number2; //expected output : 50

## Divide
let divide = number2 / number1; //expected output : 0.5

## Modulo
Display the remainder.
console.log(12%5); //return 2 => we can count two '5' in 12. Remainder : 2
console.log(10%3); //return 2 => we can count three '3' in 10. Remainder : 1

### Exemple
Securité Social :
SYYMMDDXXXXXXKK
let calculSecu = 97 - (SYYMMDDXXXXXX % 97)
console.log(calculSecu); //should return KK numbers

## Random
Math.random(); //will return a decimal between 0 and 0.9999999999999999 (16 decimals)

if(Math.random() > 0.5){
	//50% de chance
}else{
	//50% de chance
}
