# Handle errors

## if
if(condition){

}
'If' test if the parentheses conditions are true or false.
Will not show silent errors.

## try/catch
try{
	//your code
}catch(error){
	console.log(error.message);
}

If an error occured in the 'try' section, it will be throw in the 'catch' section.
Only the first error will be displayed.

### finally
try{
	//your code
}catch(error){
	console.log(error.message);
}finally{
	//code to execute even if errors happened
}

### nested
If we imbricate try...catch, errors are not autmatically throw from one to another.

try{
	try{
		//your code
	}catch(error){
		console.log(error.message); // only show 2nd 'try' errors
	}
}catch(error){
	console.log(error.message); //only show 1st 'try' errors
}

try{
	try{
		//your code
	}catch(error){
		console.log(error.message); // only show 2nd 'try' errors
		throw error;
	}
}catch(error){
	console.log(error.message); //can show both 1st and 2nd 'try' errors
}