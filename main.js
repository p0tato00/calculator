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

    updateDisplay() {
        this.resultTextContent.innerText = this.curNum
        if (this.operation !== undefined) {
            this.resultTextContent.innerText = `${this.prevNum} ${this.operation}`
            console.log(this.curNum);
            return
        }
    }

    appendNum(number) {
        if (number === "." && this.curNum.includes(".")) return
        this.curNum = this.curNum + number.toString()
        this.updateDisplay()
    }
    
    operate() {
        let result
        const prev = parseFloat(this.prevNum)
        const current = parseFloat(this.curNum)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case 'X':
                result = prev * current
                break
            case '/':
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
        if (this.curNum === '') return
        if (this.prevNum !== '') {this.operate()}
        this.operation = operator
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
    })
})

oprButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.selectOperator(button.innerText)
    })
})