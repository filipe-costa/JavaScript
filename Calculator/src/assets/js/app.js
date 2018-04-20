// JavaScript Calculator
// REGEX to fix floating point notation: /([\+\*\-\/]?([0-9]*[.])[0-9]+$)/g
// Variables
const screenCurrentEntry = document.querySelector(".entry");
const screenTotalResult = document.querySelector(".total");

// Data structures
// Objects
const calculator = {
    currentEntry: "0", // Hold the current entry
    currentResult: "0" // Hold the current result
};
// Arrays
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["*", "/", "+", "-"];
const operators1 = ["."];

// Evaluate arithmetic without eval -> Reverse Polish Notation, for later.

// Functions
// updateScreenWithCurrentEntry
function updateScreenWithCurrentEntry() {
    screenCurrentEntry.textContent = calculator.currentEntry;
}
// updateCurrentResult()
function updateScreenWithCurrentResult() {
    screenTotalResult.textContent = calculator.currentResult;
}
// clearCurrentEntry()
function clearCurrentEntry() {
    calculator.currentEntry = calculator.currentEntry.slice(0, -1);
    // If currentEntry is empty string
    if (calculator.currentEntry == "") {
        calculator.currentEntry = "0";
    }
    updateScreenWithCurrentEntry();
}
// clearAllEntries()
function clearAllEntries() {
    calculator.currentEntry = "0";
    calculator.currentResult = "0";
    updateScreenWithCurrentEntry();
    updateScreenWithCurrentResult();
}
// getTotal()
function getTotal() {
    let total = eval(calculator.currentEntry);
    total = Math.round(total * 100) / 100;
    calculator.currentResult = total.toString();
    calculator.currentEntry = calculator.currentResult;
    updateScreenWithCurrentResult();
    updateScreenWithCurrentEntry();
}
// checkInputValidation(input)
function checkInputValidation(input) {
    // gets the last character of the entry
    let lastOfStr = calculator.currentEntry[calculator.currentEntry.length - 1];
    // gets the entry
    let isEntry = calculator.currentEntry;
    // regex for floating point numbers
    let isFloat = /([\+\*\-\/]?([0-9]*[.])[0-9]+$)/g;
    if (calculator.currentEntry === "0" && calculator.currentEntry.length === 1 && numbers.includes(input)) {
        // Replace 0 with the number
        calculator.currentEntry = input;
        updateScreenWithCurrentEntry();
    } else if (calculator.currentEntry === "0" && operators.includes(input)) {
        calculator.currentEntry += input;
        updateScreenWithCurrentEntry();
    } else if (operators.includes(input)){
        // if last character is an operator and not a dot
        // replace it with new one
        if (operators.includes(lastOfStr) && lastOfStr !== ".") {
            calculator.currentEntry = calculator.currentEntry.slice(0, -1);
            calculator.currentEntry += input;
            updateScreenWithCurrentEntry();
        } else {
            calculator.currentEntry += input;
            updateScreenWithCurrentEntry();
        }
    } else if(operators1.includes(input)){
        if(lastOfStr === "."){
            return false;
        } else if (isFloat.test(isEntry) && input === "."){
            return false;
        } else {
            calculator.currentEntry += input;
            updateScreenWithCurrentEntry();
        }
    } else {
        // It is a number
        calculator.currentEntry += input;
        updateScreenWithCurrentEntry();
    }
}
// inputs
function calculatorInputs(input) {
    switch (input) {
        case "CE":
            clearCurrentEntry();
            break;
        case "AC":
            clearAllEntries();
            break;
        case "=":
            getTotal();
            break;
        case "*":
            checkInputValidation(input);
            break;
        case "/":
            checkInputValidation(input);
            break;
        case "+":
            checkInputValidation(input);
            break;
        case "-":
            checkInputValidation(input);
            break;
        default:
            checkInputValidation(input);
    }
}


// Add event listeners to all the buttons:
let buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
    button.addEventListener("click", function (ev) {
        const btnText = ev.target.textContent;
        calculatorInputs(btnText);
    });
});

