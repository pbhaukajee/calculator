const input = document.querySelector(".input");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equals");

let firstNum = "";
let secondNum = "";
let operatorClicked = "";
let calculation;

//Show numbers in display & store the values
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    input.textContent += number.textContent;
    if (operatorClicked === "") {
      firstNum += number.textContent;
    } else {
      secondNum += number.textContent;
    }
  });
});

//Select an operator
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (secondNum == "") {
      operatorClicked = operator.textContent;
      input.textContent += operator.textContent;
    } else {
      calculation = operate(
        operatorClicked,
        parseFloat(firstNum),
        parseFloat(secondNum)
      );
      updateDisplay(calculation);
    }
  });
});

//Show the result
equal.addEventListener("click", function () {
  calculation = operate(
    operatorClicked,
    parseFloat(firstNum),
    parseFloat(secondNum)
  );
  updateDisplay(calculation);
  firstNum = calculation;
});

//Show the result
function updateDisplay(outcome) {
  firstNum = "";
  secondNum = "";
  operatorClicked = "";
  input.textContent = outcome;
}

//Math formula
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

//Utilize the formula to get the result
function operate(operator, num1, num2) {
  let result;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      result = "Invalid";
      break;
  }
  return result;
}
