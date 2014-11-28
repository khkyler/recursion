// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  console.log(obj);
  
  if (typeof obj === 'number'  || typeof obj === 'boolean') {

  	console.log('passing a number or bool ' + obj);
  	return obj.toString();

  }else if (obj === null) {

  	console.log('passing a null ' + obj);
  	return 'null';

  }else if (typeof obj === 'string'){

  	console.log('passing a string ' + obj);
  	return '\"' + obj +'\"';

  }else if (obj === undefined){

  	console.log('passing a undefined ' + obj);
  	return "{}";

  } else if (Array.isArray(obj)) {

  	if (!arguments[1]){
			var objCopy = obj.slice(0);
			var newArray =[];
		} else {
			newArray = arguments[1];
			objCopy = arguments[2];
		}
		 
		if (objCopy.length > 0) {
		  var tempShift = objCopy.shift();
		  if (typeof tempShift === 'string') {
		  	tempShift = '"' + tempShift + '"';
		  } else if (Array.isArray(tempShift)) {
		  	tempShift = stringifyJSON(tempShift);
		  }
		  newArray.push(tempShift);
		  stringifyJSON(obj, newArray, objCopy);
		}
		console.log('[' + newArray.join() + ']');
		return '[' + newArray.join() + ']';

  	
  }else {

  	if (!arguments[1]){
  		var tempKeyArray = Object.getOwnPropertyNames(obj);
  		var tempJSONArray = []
  	} else {
  		tempKeyArray = arguments[1];
  		tempJSONArray = arguments[2];
  	}
  	if (tempKeyArray.length > 0){
  		var tempShift = tempKeyArray.shift();
  		var tempValue = obj[tempShift];
  		if (typeof tempShift === 'string') {
  			tempShift = '"' + tempShift + '"';
  		} 
  		if (typeof tempValue === 'string') {
  			tempValue = '"' + tempValue + '"';
  		} else  if (typeof tempValue === 'object') {
  			console.log('!!');
  			tempShift = stringifyJSON(tempShift);
  		}

  		tempJSONArray.push(tempShift + ':' + tempValue);
  		stringifyJSON(obj,tempKeyArray, tempJSONArray);
  	}
  	console.log('{' + tempJSONArray.join() + '}');
  	return '{' + tempJSONArray.join() + '}';
  }
};
