const screen = document.getElementById("screen");
let expression = "";

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

function add(value) {
  if ((screen.value === "0" || expression === "") && value !== ".") {
    expression = value;
  } else {
    expression += value;
  }
  screen.value = expression;
}

function clearAll() {
  expression = "";
  screen.value = "0";
}

function deleteLast() {
  expression = expression.slice(0, -1);
  screen.value = expression === "" ? "0" : expression;
}

function isValid(exp) {
  if (exp === "") return false;

  if (/^[+\-*/]/.test(exp)) return false;

  if (/[+\-*/.]$/.test(exp)) return false;

  if (/[+\-*/]{2,}/.test(exp)) return false;

  if (!/^[0-9.+\-*/]+$/.test(exp)) return false;

  return true;
}

function calculate() {
  if (!isValid(expression)) {
    screen.value = "SYNTAX ERROR";
    expression = "";
    return;
  }

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

function toggleKeyboardMode() {
  keyboardMode = document.getElementById("keyboardToggle").checked;
  const overlay = document.getElementById("overlay");
  overlay.style.display = keyboardMode ? "block" : "none";
}

document.addEventListener("keydown", (event) => {
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
