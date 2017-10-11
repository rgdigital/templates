$1(window).ready(function() {



  // Create AgeGate
  new AgeGate();

});

// Constructor
var AgeGate = function() {
  
  var self = this;
  this.stage = document.body;

  this.one = $1();

  // Reset
  document.body.style.margin = 0;
  document.body.style.padding = 0;

  // Hide info bar
  this.one.Platform.BeOn.hideInfoBar();
  this.one.Platform.BeOn.hidePoster();
  // this.one.Platform.BeOn.hideControlBar();

  // Layout
  this.one.Platform.BeOn.layout({
    height : '100%'
  });

  // Render
  this.renderView('overlay');

  this.attachEvents();

};

AgeGate.prototype.renderView = function(name) {
  var view = window.views[name]();
  this.stage.innerHTML += view;
}

AgeGate.prototype.attachEvents = function(name) {
  var _this = this;
  // Container
  var wrapper = document.getElementById('age-gate-wrapper');
  var container = document.getElementsByClassName("age-form")[0];
  var inputs = container.getElementsByClassName('form-input');
  var submit = document.getElementById('submit');
  var error = document.getElementsByClassName('error')[0];
  // Key presses
  function keyDownEvent(i) {
    inputs[i].onkeyup = function(e) {
      // Prevent next focus for arrow keys
      if (event.keyCode >= 48 && event.keyCode <= 57) {
          // Number
      } else if (event.keyCode >= 65 && event.keyCode <= 90) {
          // Alphabet upper case
      } else if (event.keyCode >= 97 && event.keyCode <= 122) {
          // Alphabet lower case
      } else {
        return;
      }
      if (this.value.length == this.maxLength) {
        if (i+1 == inputs.length) {
          // Focus on submit button
          submit.focus();
        } else {
          inputs[i+1].focus();
        }
      }
    }
  }
  function validate() {
    var ageLimit = 18;

    var day = inputs[0].value;
    var month = inputs[1].value;
    var year = inputs[2].value;
    var date = day+'/'+month+'/'+year;
    var valid = isValidDate(date);

    if (!valid) {
      return 'Please enter a valid age';
    }

    var today    = new Date(); 
    var birthday = new Date(year, month, day);
    var age      = new Date(today - birthday);
        age = age/1000/60/60/24/365;

    if (age < ageLimit) {
      return 'You\'re not old enough to view';
    }

    return true;
  }

  function isValidDate(dateString)
  {
    // Format: 01/01/2000
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;
    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;
    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;
    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  // Add em'
  for (var i = 0; i < inputs.length; i++) {
    keyDownEvent(i);
  }
  // Submit
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    var valid = validate();
    if (typeof valid == 'string') {
      error.className = 'error visible';
      error.innerHTML = '<p>'+valid+'</p>';
    } else {
      error.innerHTML = '';
      wrapper.className = 'passed';
      error.className = 'error';
      _this.one.Platform.BeOn.play();
      _this.one.Platform.BeOn.showPoster();
    }
  })
}