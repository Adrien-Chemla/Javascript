# Regular Expression
Use to match strings.

let text = "Is it a bird ? Is it a plane ?";
let text2 = "No, it's Superman !";
let regExp = /Superman/;
regExp.test(text); //return false
regExp.test(text2); //return true


[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)