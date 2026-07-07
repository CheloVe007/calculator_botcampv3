const screen = document.getElementById("screen");
let expression = "";

// basic math functions
function sum(a, b) {
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

// add a number or operator to the expression
function add(value) {
  if ((screen.value === "0" || expression === "") && value !== ".") {
    expression = value;
  } else {
    expression += value;
  }
  screen.value = expression;
}

// C button: clear everything
function clearAll() {
  expression = "";
  screen.value = "0";
}

// Delete button: remove the last character
function deleteLast() {
  expression = expression.slice(0, -1);
  screen.value = expression === "" ? "0" : expression;
}

// checks if the expression has valid syntax
function isValid(exp) {
  // empty expression
  if (exp === "") return false;

  // cannot start with an operator (+ - * /)
  if (/^[+\-*/]/.test(exp)) return false;

  // cannot end with an operator or a dot
  if (/[+\-*/.]$/.test(exp)) return false;

  // cannot have two operators in a row (like ++, +-, etc.)
  if (/[+\-*/]{2,}/.test(exp)) return false;

  // only numbers, dots and + - * / are allowed
  if (!/^[0-9.+\-*/]+$/.test(exp)) return false;

  return true;
}

// = button: calculate the result of the expression
function calculate() {
  if (!isValid(expression)) {
    screen.value = "SYNTAX ERROR";
    expression = "";
    return;
  }

  // split the expression into numbers and operators
  // example: "5+3*2" -> ["5", "+", "3", "*", "2"]
  const tokens = expression.match(/(\d+\.?\d*)|([+\-*/])/g);

  let result = parseFloat(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseFloat(tokens[i + 1]);

    if (operator === "+") {
      result = sum(result, nextNumber);
    } else if (operator === "-") {
      result = subtract(result, nextNumber);
    } else if (operator === "*") {
      result = multiply(result, nextNumber);
    } else if (operator === "/") {
      if (nextNumber === 0) {
        screen.value = "SYNTAX ERROR";
        expression = "";
        return;
      }
      result = divide(result, nextNumber);
    }
  }

  screen.value = result;
  expression = String(result);
}

let keyboardMode = false;

// turns keyboard mode on/off when the switch is clicked
function toggleKeyboardMode() {
  keyboardMode = document.getElementById("keyboardToggle").checked;
  const overlay = document.getElementById("overlay");
  overlay.style.display = keyboardMode ? "block" : "none";
}

document.addEventListener("keydown", (event) => {
  // only listen to the keyboard if keyboard mode is turned on
  if (!keyboardMode) return;

  const key = event.key;

  if (/^[0-9]$/.test(key) || ["+", "-", "*", "/", "."].includes(key)) {
    add(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearAll();
  }
});
