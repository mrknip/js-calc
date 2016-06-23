var operations = ['+', '-', '*', '/', '=', 'C']

var currentOperation = function() {
  this.x = undefined;
  this.y = undefined;
  this.operation = undefined;
}

function add(x,y) {
	return x + y;
}

function multiply(x,y) {
	return x * y;
}

function divide(x,y) {
	return x / y;
}

function subtract(x,y) {
	return x - y;
}

function makeButton(n) {
    var newDiv = document.createElement('div')
    newDiv.id = 'btn' + n;
    newDiv.className = 'btn';
    newDiv.innerHTML = n; 
    return newDiv;
}

function makeNumberButtons() {
  console.log('makeButtons()')
  for (var i = 1; i <= 9; i++) {
    document.getElementById('calcPad').appendChild(makeButton(i));
  }
}

function makeOperationButtons() {
  for (i in operations) {
    document.getElementById('calcPad').appendChild(makeButton(operations[i]));  
  }
}


function setListeners() {
  for (var i = 1; i <= 9; i++) {
    document.getElementById('btn' + i).addEventListener('click', function(){
      console.log(this.innerHTML)
    })
  }

  for (i in operations) {
    document.getElementById('btn' + operations[i]).addEventListener('click', function(){
      console.log(this.innerHTML)
    })
  }
}

function logClick(i) {
  console.log(i)
}

document.onload = (function() {
  console.log('documentload fired');
  makeNumberButtons();
  makeOperationButtons();
  setListeners();
})();