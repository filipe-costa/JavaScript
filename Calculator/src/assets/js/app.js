// JavaScript Calculator
// Display Elements
const display = {
    entry: document.querySelector(".entry"),
    result: document.querySelector(".calc")
}
// Data Structures
const calculator = {
    entry: "0", // holds the entry
    result: "0" // hold the result
}
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["*", "/", "+", "-"];
const operators1 = ["."];
// Reusable functions
function updateEntry() {
  display.entry.textContent = calculator.entry;
}
function displayResult() {
  display.result.textContent = calculator.result;
}
function clearEntry() {
  // clears entry
  // Removes 0
  calculator.entry = calculator.entry.slice(0, -1);
  if (calculator.entry == "") {
    calculator.entry = "0";
  }
  updateEntry();
}
function clearsAll() {
  // clears all
  calculator.entry = "0";
  calculator.result = "0";
  updateEntry();
  displayResult();
}
function result() {
  let result = eval(calculator.entry);
  result = Math.round(result * 100) / 100;
  calculator.result = result.toString();
  calculator.entry = calculator.result;
  displayResult();
  updateEntry();
}
// Function to check for input entries
function inputs(input) {
  if (input === "CE") {
    clearEntry();
  } else if (input === "AC") {
    clearsAll();
  } else if (input === "=") {
    result();
  } else if (operators.includes(input)) {
    helpers(input);
  } else if (operators1.includes(input)) {
    helpers(input);
  } else if (numbers.includes(input)) {
    helpers(input);
  } else {
    console.log("Hack me!");
    return false;
  }
}
// Helpers function to check for conditions
function helpers(input) {
    if (calculator.entry === "0" && calculator.entry.length === 1 && numbers.includes(input)) {
        // Removes 0
        calculator.entry = input;
        updateEntry();
    } else if (calculator.entry === "0" && operators.includes(input)) {
        calculator.entry += input;
        updateEntry();
    } else if (numbers.includes(input) && calculator.entry.length === 1 && calculator.entry !== "0") {
        calculator.entry += input;
        updateEntry();
    } else if (operators.includes(input)) {
        // check if the last character of the entry is an operator and not a dot
        let lastOfStr = calculator.entry[calculator.entry.length - 1];
        // if it is, replace by the new one
        if (operators.includes(lastOfStr) && lastOfStr !== ".") {
            calculator.entry = calculator.entry.slice(0, -1);
            calculator.entry += input;
            updateEntry();
        } else {
            calculator.entry += input;
            updateEntry();
        }
    } else if(operators1.includes(input)) {
        // Get  current entry
        let isEntry = calculator.entry;
        // check if the last character of the entry is a dot
        let lastOfStr = calculator.entry[calculator.entry.length - 1];
        // Regex to for floating point numbers
        let isFloat = /([\+\*\-\/]?([0-9]*[.])[0-9]+$)/g;
        if(lastOfStr === "."){
            return false;
        } else if(isFloat.test(isEntry) && input === "."){
            return false;
        } else {
            calculator.entry += input;
            updateEntry();
        }
    } else {
        // Otherwise, it is a number:
        calculator.entry += input;
        updateEntry();
    }
}
// Add event listeners to the buttons
let buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
    button.addEventListener("click", function (ev) {
        const type = ev.target.textContent;
        inputs(type);
    });
});
