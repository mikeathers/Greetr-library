

// IIFE used so the framework is wrapped up in its own execution
// context making it safe for it to be used in a project, 
// no overlapping variable names etc.

// Takes 2 parameters which will be the global object and jQuery.

(function(global, $) {

  // Create new Greetr varibale which returns a new function call.
  // This means when using Greetr we dont need to create a new object
  // every time as calling Greetr will run this line which will 
  // automatically create a new object and return it.

  var Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  }

  // The following variables are not exposed to the outside world,
  // making them private to the Greetr object. (Private fields)
  // Closures make these variables accessible in Greetr.init.

  var supportedLangs = ["en", "es"];
  var greetings = {
    en: "Hello",
    es: "Hola"
  };
  var formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };
  var logMessages = {
    en: "Logged in",
    es: "Inicio sesion"
  };

  // Setup the prototype object ready for any methods.
  // Setting methods on the prototype means that all Greetr
  // objects will have access to the same methods, and the function
  // only has to be read into memory once, instead of on every instance of Greetr,
  // this saves memory.

  Greetr.prototype = {

    // Returns firsname and lastname passed into Greetr when first instantiated.
    // "this" will point to the Greetr object as this is the prototype of Greetr.

    fullName: function() {
      return this.firstname + " " + this.lastname;
    },

    // Check if the language of the Greetr object is part of the supportedLangs array.
    // You can pass in a language or leave the default language as "en".
    // If the language is found in the array the result will be 1, if not found -1.

    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    // Gets the value of the greeting object where the key is the language passed into the Greetr object.
    // greetings[en] will return "Hello" for example. Returns the greeting and the firstname.

    greeting: function() {
      return greetings[this.language] + " " + this.firstname + "!";
    },

    // Same as above but for the formalGreeting object. Returns the greeting and then the return value
    // of this.fullName. When using "this", JS will look for the function on the top object (Greetr)
    // if its not found, it will continue down and check the prototype where it will find the method.

    formalGreeting: function() {
      return formalGreetings[this.language] + ", " + this.fullName();
    },

    // Allows you to pass in a parameter and get either the standard greeting or the formal greeting. 
    // if (console) is needed for IE browsers. Doesnt have a varibale unless console is open.
    // Logs the greeting to the console.

    greet: function(formal) {
      var message;
      // if formal is undefiened or null it will be coerced to "false"
      if (formal) {
        message = this.formalGreeting();
      } else { message = this.greeting(); }
      if (console) {
        console.log(message);
      }
      // "this" refers to the calling object at execution time making the method chainable.
      return this;
    },

    // Logs the logMessage value for the language passed in along with the full name of the user.

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ":" + this.fullName());
      }
      return this;
    },

    // Allows the user to set a new language on the Greetr object, pass in the new langauge, 
    // update the objet with the new language then run the validate method to make sure
    // the language is part of the supportedLangs array.

    setLang: function(lang) {
      this.language = lang;
      this.validate();
      return this;
    },

    // Adds jQuery support allowing us to return the greeting and use it on a html object 
    // selector from jQuery.
    
    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }
      if (!selector) {
        throw "Missing jQuery selector";
      }
      var message;
      if (formal) {
        message = this.formalGreeting();
      } else {
        message = this.greeting();
      }
      $(selector).html(message);
      return this;
    } 
  };

  // Setup an init method on the Greetr object which initializes
  // the object and sets default values if no values are passed in.
  // Validates the language passed in and makes sure its part of the supportLangs array.

  Greetr.init = function(firstname, lastname, language) {
    var self = this;
    self.firstname = firstname || "";
    self.lastname = lastname || "";
    self.language = language || "en";

    self.validate();
  }

  // For Greetr.init to use any methods created in the Greetr.prototype 
  // call, Greetr.init.prototype needs to point to the Greetr.prototype object 
  // we created.

  Greetr.init.prototype = Greetr.prototype;

  // For Greetr or G$ to be usable we create 2 new variables on the 
  // global object and we point those variables to the function call
  // of Greetr which returns a new Greetr.init object.

  global.Greetr = global.G$ = Greetr;

}(window, jQuery));


