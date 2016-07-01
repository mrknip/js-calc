var app = app || {};

app.config = {
  OPERATIONS: ['+', '-', '*', '/', '=', 'C']
}

app.inputParser = {
  x: '',
  y: '',
  position: 1,
  operation: undefined,
  ans: undefined,

  parse: function(input) {
    if (!isNaN(parseFloat(input)) && this.position === 1) {
      this.x += input;
      this.x = this.x.replace(/^0+(?=[1-9])/, '');
      this.display(this.x);
      console.log(this.x);
    }

    if (!isNaN(parseFloat(input)) && this.position === 2) {
      this.y += input;
      this.display(this.x + this.operation + this.y);
      console.log(this.x, this.operation, this.y);
    }

    if (this.position === 1 && input == '.' && this.x.slice(-1) != '.') {
      this.x += input;
      if (this.x[0] == '.') { 
        this.x = '0'.concat(this.x) 
      }
      this.display(this.x);
      console.log(this.x);
    }

    if (this.position === 2 && input == '.' && this.y.slice(-1) != '.') {
      this.y += input;
      if (this.y[0] == '.') { 
        this.y = '0'.concat(this.x) 
      }
      this.display(this.x + this.operation + this.y);
      console.log(this.x, this.operation, this.y);
    }

    if (app.config.OPERATIONS.includes(input)) {
      switch(input) {
        case 'C':
          this.reset();
          break;
        case '=':
          if (!this.operation) {
            return
          }
          this.calculate(this.x, this.y, this.operation);
          this.reset();
          break;
        default:
          this.addOperation(input);
      }
    }
  },

  addOperation: function(operation) {
    if ((isNaN(parseFloat(this.x))) && this.ans) {
      this.x = this.ans;
    }

    if ((!isNaN(parseFloat(this.x))) && (isNaN(parseFloat(this.y)))) {
      this.operation = operation;
      this.position = 2;
    }
    this.display(this.x + this.operation)
  },

  reset: function() {
    this.x = '';
    this.y = '';
    this.position = 1;
    this.operation = undefined;
  },

  display: function (text) {
    // var displayText = this.x + this.operation + this.y;
    document.getElementById('screen').innerHTML = text;
  },

  calculate: function(x,y,operation) {
    var x = parseFloat(x),
        y = parseFloat(y);

    switch(operation) {
      case '+':
        this.ans = this.add(x,y).toString();
        break;
      case '-':
        this.ans = this.subtract(x,y).toString();
        break;
      case '*':
        this.ans = this.multiply(x,y).toString();
        break;
      case '/':
        this.ans = this.divide(x,y).toString();
        break;
    }
    document.getElementById('screen').innerHTML = this.ans;
  },

  add: function(x,y) {
    return x + y;
  },

  multiply: function(x,y) {
    return x * y;
  },

  divide: function(x,y) {
    return (x / y);
  },

  subtract: function(x,y) {
    return x - y;
  }
}

// PAGE LOGIC
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
    document.getElementById('numbers').appendChild(makeButton(i));
  }
  document.getElementById('numbers').appendChild(makeButton('0'))
  document.getElementById('numbers').appendChild(makeButton('.'))
}

function makeOperationButtons() {
  for (var i = 0; i < app.config.OPERATIONS.length; i++) {
    document.getElementById('calcPad')
            .appendChild(makeButton(app.config.OPERATIONS[i]));  
  }
}

function setListeners() {
  for (var i = 0; i <= 9; i++) {
    document.getElementById('btn' + i).addEventListener('click', function(){
      app.inputParser.parse(this.innerHTML);   
    })
  }

  document.getElementById('btn.').addEventListener('click', function(){
    app.inputParser.parse(this.innerHTML);
  })

  for (var i = 0; i < app.config.OPERATIONS.length; i++) {
    document.getElementById('btn' + app.config.OPERATIONS[i])
            .addEventListener('click', function(){
      app.inputParser.parse(this.innerHTML);   
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