// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  
  var body = document.body;
  var elementsWithClass = [];
  

  var addNodes = function(element) {
    if (element.classList === undefined) {
      return;
    }
    if (element.classList.contains(className)) {
      elementsWithClass.push(element);
    }
    for (var i = 0; i < element.childNodes.length; i++) {
      addNodes(element.childNodes[i]);
    }
  }

  addNodes(body);

  return elementsWithClass;
};
