class Calculator {
    constructor(resultTextContent) {
        this.resultTextContent = resultTextContent
        this.clear()
    }

    clear() {
        this.prevNum = ''
        this.curNum = ''
        this.operation = undefined
    }

    delete() {
        if (this.operation !== undefined && this.curNum === '') {
            this.operation = undefined    
            this.curNum = this.prevNum
            this.prevNum = ''
            return
        }
        this.curNum = this.curNum.toString().slice(0, -1)
    }

    percent() {
        this.curNum *= 0.1
    }

    updateDisplay() {
        if (this.operation === undefined) {
            this.resultTextContent.innerText = `${this.curNum}`    
        } else if (this.prevNum === '') {
            this.resultTextContent.innerText = `${this.curNum} ${this.operation} ${this.prevNum}`
        } else {
            this.resultTextContent.innerText = `${this.prevNum} ${this.operation} ${this.curNum}`
        }
    }

    appendNum(number) {
        if (number === "." && this.curNum.includes(".")) return
        if (number === "." && this.curNum === "") {this.curNum = '0'} 
        this.curNum = this.curNum + number.toString()
    }
    
    operate() {
        let result
        const prev = parseFloat(this.prevNum)
        const current = parseFloat(this.curNum)
        console.log(prev, current, this.curNum);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case 'X' || 'x' || '*':
                result = prev * current
                break
            case '/':
                if (this.curNum === '0') {
                    alert("cant divide by 0!")
                    return
                }
                result = prev / current
                break
            default:
                return
        }
        this.curNum = result
        this.operation = undefined
        this.prevNum = ''
    }

    selectOperator(operator) {
        if (this.operation === '-' && operator === '-') {
            this.curNum = -this.curNum
            return}
        if (this.prevNum !== '' && this.curNum !== '') {this.operate()}
        this.operation = operator
        if (this.curNum === '') return
        this.updateDisplay()
        this.prevNum = this.curNum
        this.curNum = ''
    }
}


const resultScreen = document.getElementById('result');
const numButtons = document.querySelectorAll('.number');
const oprButtons = document.querySelectorAll('.operator');
const clrButton = document.getElementById('clearBtn');
const delButton = document.getElementById('delBtn');
const eqlButton = document.getElementById('equalsBtn');
const percentButton = document.getElementById('percentBtn')

let cal = new Calculator(resultScreen)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.appendNum(button.innerHTML)
        cal.updateDisplay()
    })
})

oprButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.selectOperator(button.innerText)
        cal.updateDisplay()
    })
})

clrButton.addEventListener('click', () => {
    cal.clear()
    cal.updateDisplay()
})

delButton.addEventListener('click', () => {
    cal.delete()
    cal.updateDisplay()
})

eqlButton.addEventListener('click', () => {
    cal.operate()
    cal.updateDisplay()
})

percentButton.addEventListener('click', () => {
    cal.percent()
    cal.updateDisplay()
})

window.addEventListener('keydown', (event) => {
    let numbersPattern = /[0-9]/g 
    let operatorsPattern = /[+-/*x]/gi

    if (event.key.match(numbersPattern)) {
        event.preventDefault()
        cal.appendNum(event.key)
        cal.updateDisplay()
    }

    if (event.key.match(operatorsPattern)) {
        event.preventDefault()
        cal.selectOperator(event.key)
        cal.updateDisplay()
    }

    if (event.key === 'Enter') {
        event.preventDefault()
        cal.operate()
        cal.updateDisplay()
    }

    if (event.key === 'Backspace') {
        event.preventDefault()
        cal.delete()
        cal.updateDisplay()
    }
})