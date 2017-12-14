
// Creates new Greetr object and passes in firstname, lastname and leave default "en" language.
var g = G$("John", "Doe");

// Calls the greet function, sets the language, calls the greet function again making it formal,
// logs output to the console.
g.greet().setLang("es").greet(true).log();

// Output: 
// Hello John!
// Saludos, John Doe

$("#login").on("click", function() {
  var loginGreetr = G$("John", "Doe");
  $("#logindiv").hide();
  loginGreetr.setLang($("#lang").val()).HTMLGreeting("#greeting", true).log();
});