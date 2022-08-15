const prevResult = document.getElementById('previous');
const curResult = document.getElementById('current');
const numButtons = document.querySelectorAll('.number');
const oprButtons = document.querySelectorAll('.operator');
const clrButton = document.getElementById('clearBtn');
const delButton = document.getElementById('delBtn');
const eqlButton = document.getElementById('equalsBtn');
const percentButton = document.getElementById('percentBtn')

let prevNum;
let currNum;
let currOperator = null;

// Operators
function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function calculate(operator, x, y) {
    return operator(x, y);
}

function operate(operator) {
    currNum = curResult.textContent;
    console.log(currOperator);
    curResult.textContent = calculate(operator, Number(prevNum), Number(currNum));
}

function percent(x) {
    return x / 100;
}

function clear() {
    curResult.textContent = 0;
}

function appendNum(num) {
    if (curResult.textContent === '0') {
        return curResult.textContent = num;
    } 
    return curResult.textContent += num;
}

// Button on click
clrButton.addEventListener('click', clear)

numButtons.forEach((button) => {
    button.addEventListener('click', () => appendNum(button.textContent))
})

oprButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(currOperator !== null) operate(currOperator);
        currOperator = button.dataset.operator.replace(/"/g,"");        ;
        prevNum = curResult.textContent;
        prevResult.textContent = `${prevNum} ${button.textContent}`;
        curResult.textContent = '0';
    })
})



