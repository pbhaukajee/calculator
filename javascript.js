const input = document.querySelector(".input");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equals");

let firstNum = "";
let secondNum = "";
let operatorClicked = "";
let calculation;
let equalClicked = false;

//Show numbers in display & store the values
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (firstNum.length > 20 || secondNum.length > 20) {
      return;
    }
    if (equalClicked) {
      if (operatorClicked === "") {
        input.textContent = "";
        firstNum = "";
      } else {
        firstNum = calculation;
      }
      equalClicked = false;
    }
    if (operatorClicked === "") {
      if (number.textContent === ".") {
        if (firstNum.includes(".")) {
          return;
        }
      }
      firstNum += number.textContent;
      input.textContent += number.textContent;
    } else {
      if (number.textContent === ".") {
        if (secondNum.includes(".")) {
          return;
        }
      }
      secondNum += number.textContent;
      input.textContent = secondNum;
    }
  });
});

//Select an operator
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (secondNum === "") {
      operatorClicked = operator.textContent;
      input.textContent += operator.textContent;
    } else {
      calculation = operate(
        operatorClicked,
        parseFloat(firstNum),
        parseFloat(secondNum)
      );
      updateDisplay(calculation);
      operatorClicked = operator.textContent;
      firstNum = calculation;
    }
  });
});

//Show the result
equal.addEventListener("click", function () {
  if (firstNum === "" && secondNum === "" && operatorClicked === "") {
    return;
  }
  calculation = operate(
    operatorClicked,
    parseFloat(firstNum),
    parseFloat(secondNum)
  );
  updateDisplay(calculation);
  firstNum = calculation;
  equalClicked = true;
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
      result = num1;
      break;
  }
  return result;
}
