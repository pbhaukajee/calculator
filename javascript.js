const input = document.querySelector(".input");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const backSpace = document.querySelector(".delete");

let firstNum = "";
let secondNum = "";
let operatorClicked = "";
let calculation;
let equalClicked = false;

clear.addEventListener("click", () => {
  clearAll();
});

backSpace.addEventListener("click", function () {
  let newData = erase();
  input.textContent = newData;
});

//Show numbers in display & store the values
numbers.forEach((number) => {
  number.addEventListener("click", function (e) {
    if (firstNum.length > 20 || secondNum.length > 20) {
      return;
    }
    numberClicked(e.target.textContent);
  });
});

function numberClicked(value) {
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
    if (value === ".") {
      if (firstNum.includes(".")) {
        return;
      }
    }
    firstNum += value;
    input.textContent += value;
  } else {
    if (value === ".") {
      if (secondNum.includes(".")) {
        return;
      }
    }
    secondNum += value;
    input.textContent = secondNum;
  }
}

//Select an operator
operators.forEach((operator) => {
  operator.addEventListener("click", function (e) {
    operations(e.target.textContent);
  });
});

function operations(data) {
  if (secondNum === "") {
    operatorClicked = data;
    input.textContent += data;
  } else {
    calculation = operate(
      operatorClicked,
      parseFloat(firstNum),
      parseFloat(secondNum)
    );
    updateDisplay(calculation);
    operatorClicked = data;
    firstNum = calculation;
  }
}

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

function clickEqual() {
  equal.click();
}

//Show the result
function updateDisplay(outcome) {
  firstNum = "";
  secondNum = "";
  operatorClicked = "";

  let display = outcome.toString();
  input.textContent = display.includes(".")
    ? parseFloat(outcome.toFixed(2))
    : outcome;
}

//clear everything
function clearAll() {
  firstNum = "";
  secondNum = "";
  operatorClicked = "";
  input.textContent = "";
}

//delete item
function erase() {
  return input.textContent.slice(0, -1);
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

window.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    numberClicked(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    operations(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "delete" || e.key === "Backspace") {
    input.textContent = erase();
  }
});
