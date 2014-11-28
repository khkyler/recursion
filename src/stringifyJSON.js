// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  
  if (typeof obj === 'number'  || typeof obj === 'boolean') {

  	return obj.toString();

  }else if (obj === null) {

  	return 'null';

  }else if (typeof obj === 'string'){

  	return '\"' + obj +'\"';

  }else if (obj === undefined){

  	
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
		  } else if (Array.isArray(tempShift) || typeof tempShift === 'object') {
		  	tempShift = stringifyJSON(tempShift);
		  }
		  newArray.push(tempShift);
		  stringifyJSON(obj, newArray, objCopy);
		}
		
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
  		} else if (typeof tempShift === 'function') {
	  		tempShift = undefined;
	  	}

			if (typeof tempValue === 'string') {
				tempValue = '"' + tempValue + '"';
			} else  if (typeof tempValue === 'object') {
				
				tempValue = stringifyJSON(tempValue);
			}else if (typeof tempValue === 'function') {
	  		tempShift = undefined;
	  	}

			if (!(tempShift === undefined || tempValue === undefined)) {
				tempJSONArray.push(tempShift + ':' + tempValue);
			}
			
			stringifyJSON(obj,tempKeyArray, tempJSONArray);
	  	}
  	
  	return '{' + tempJSONArray.join() + '}';
  }
};
