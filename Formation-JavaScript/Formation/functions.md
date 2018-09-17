# Perfect Functions

### 1 action, 1 function
A function should only do one action to easily understand and update the code afterwards.
Instead of using complex functions doing multiple tasks, create several small functions doing one task.
``` JavaScript
// Don’t :
window.calculateControleAndPasteFieldValue = function(calculField1, calculField2, pasteField){
    //Calculate Fields
    //code here...

    //Controle field value
    //code here...

    //Paste calcul value
    //code here...
};
calculateControleAndPasteFieldValue();

// Do :
window.calculateFieldValue = function(calculField1, calculField2){
    //code here...
};
window.controleFieldValue = function(fieldValue){
    //code here...
};
window.pasteFieldValue = function(fieldValue, pasteField){
    //code here...
};
```

### Errors and Controls
Basically, all controls should be done inside the function and not outside.
If something prevents the function from working properly, it should still return an error message.

If it is purely technical it should be transparent for the user (displayed in the console for example).
``` JavaScript
// Exemple :
//test if fields exists
if(field){
    //Do Something
}else{
    console.log("function name - field not found");
}
```

You can enter different kind of messages in the console with a slightly different look.
``` javascript
console.log("this is a classic error message");
console.warn("This is an important message");
console.info("This is an informative message");
```

If it is a functional issue it should warn the user with an alert.
``` JavaScript
// Exemple :

//test field value
if(field.getValue() < 1000 ){
    alert("field value can't be inferior than 1000");
}else{
    //Do something
}
```

Also make sure to use a clear message which indicates which function and which part of it failed.

### Make your functions global
We never know when a function will be useful in other cases.
When you create a function, make sure this function is generic and accepts arguments which make it reusable rather than creating static variables inside.
``` JavaScript
// Don’t :
window.calculateField3 = function(){
    //declare variables
var field1 = neocase.form.field(‘INTERVENTIONS_EN_COURS$VALEUR1’);
var field2 = neocase.form.field(‘INTERVENTIONS_EN_COURS$VALEUR2’);
var field3 = neocase.form.field(‘INTERVENTIONS_EN_COURS$VALEUR3’);
    if(field1.getValue() !== “” && field2.getValue() !== “”){
        field3.setValue(field1.getValue()+field2.getValue());
    }
};
calculateField3();

// Do :
window.calculateFields = function(fieldCalc1,fieldCalc2,fieldResult){
    if(fieldCalc1.getValue() !== “” && fieldCalc2.getValue() !== “”){
        fieldResult.setValue(fieldCalc1.getValue()+fieldCalc2.getValue());
    }
};
calculateFields(neocase.form.field(‘INTERVENTIONS_EN_COURS$VALEUR1’), neocase.form.field(‘INTERVENTIONS_EN_COURS$VALEUR2’), neocase.form.field(‘INTERVENTIONS_EN_COURS$VALEUR3’));
```

### Avoid comments
If you need to insert commentary, it might be that your code is not clear enough.
So make sure your variable and functions name are logical and precise.
```javascript
//Don't
/* Function to calculate annual Salary */
window.newFunction = function(field1,field2){
    //test if 'monthly salary' & 'number of months' exists
    if(field1 && field2){
        //calculate annual Salary
        var result = parseFloat(field1.getValue())*parseFloat(field2.getValue());

        //return annual Salary if the result is a number
        return Number.isNaN(result) ? "" : result;
    }
};

//Do
window.calculateAnnualSalary = function(monthlySalary,workingMonthsNumber){

    if(monthlySalary && workingMonthsNumber){
        var annualSalary = parseFloat(monthlySalary.getValue())*parseFloat(workingMonthsNumber.getValue());
        return Number.isNaN(total) ? "" : total;
    }

};
```

### The perfect function
``` JavaScript
// Exemple :
window.testField = function(){

	for(c=0; c<arguments.length; c++){
		if(!arguments[c] && arguments[c].elementHMTL === null){
			console.warn("field doesn't exists");
			return false;
		}
	}
	return true;
};

window.testIfValueIsNumber = function(){

	for(b=0; b<arguments.length; b++){

		if(arguments[b].getValue() === ""){
			console.log(arguments[b].label()+" is empty");
			return false;
		}else if(Number.isNaN(arguments[b].getValue()) === true){
			console.log(arguments[b].label()+" value is not a number");
			return false;
		}
		return true;
	}

};

window.additionFields = function(){

	var total = 0;

	for(a=0;a<arguments.length;a++){

		if(testField(arguments[a]) && testIfValueIsNumber(arguments[a])){
			total = total+parseFloat(arguments[a].getValue());
		}

	}

	return Number.isNaN(total) ? "" : total;
};

```