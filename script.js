"use strict";

const input = document.querySelector('input[name="number"]');
const calcInput = document.querySelector('.calc-input');
let numberErr = document.querySelector('#number-err');
const swapButton = document.querySelector('.js-swap');
const fromSelect = document.querySelector('select[name="from"]');
const toSelect = document.querySelector('select[name="to"]');
const form = document.querySelector('.calc-form');
let resultRow = null;

swapButton.addEventListener('click', function(event) {
  event.preventDefault();
  const fromValue = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = fromValue;
});

let inputValue = '';
   
input.addEventListener('input', (event) => {
    inputValue = event.target.value;
});

function isNumeric(inputValue) {
    return /^\d+$/.test(inputValue);
}

function validateInput() {
    if (inputValue === '') {
        if (!numberErr) {
            numberErr = document.createElement('div');
            numberErr.id = 'number-err';
            numberErr.classList.add('calc-error-message');
            calcInput.appendChild(numberErr);
        }
        numberErr.textContent = "Заповніть це поле";
        return false;
    }
    if (!isNumeric(inputValue)) {
        if (!numberErr) {
            numberErr = document.createElement('div');
            numberErr.id = 'number-err';
            numberErr.classList.add('calc-error-message');
            calcInput.appendChild(numberErr);
        }
        numberErr.textContent = "Число містить символи, відсутні у вибраній системі числення";
        return false;
    }
    if (numberErr) {
        numberErr.remove();
    }
    return true;
}

function decimalToOctal(number) {
    let octal = 0;
    let i = 1;

    while (number != 0) {
        octal += (number % 8) * i;
        number = Math.floor(number / 8);
        i *= 10
    }
    return octal;
}

function octToDec(number) {
    let dec = 0;
    let base = 1;
    while (number !== 0) {
      let digit = number % 10;
      dec += digit * base;
      base *= 8;
      number = Math.floor(number / 10);
    }
    return dec;
  }

const convertButton = document.querySelector('.calc-submit');
convertButton.addEventListener('click', (event) => {
    event.preventDefault();
    const numberInput = form.querySelector('input[name="number"]');
    const fromSelect = form.querySelector('select[name="from"]');
    const toSelect = form.querySelector('select[name="to"]');
    if (validateInput()) {
        const number = Number(numberInput.value);
        const from = Number(fromSelect.value);
        const to = Number(toSelect.value);
          
        let convertedNumber;
        if (from === 10 && to === 8) {
            convertedNumber = decimalToOctal(number);
            console.log(decimalToOctal(number));
        }
        if (from === 8 && to === 10) {
            convertedNumber = octToDec(number);
            console.log(octToDec(number));
        }
          
        if (resultRow) {
            const calcResultValue = resultRow.querySelector('.calc-result-value');
            calcResultValue.textContent = convertedNumber;
        } else {
            resultRow = document.createElement('div');
            resultRow.classList.add('calc-frow');
            resultRow.classList.add('result-row');
            resultRow.classList.add('pt-2');
            form.appendChild(resultRow);
            const calcFleft = document.createElement('div');
            calcFleft.classList.add('calc-fleft');
            calcFleft.textContent = "Результат";
            const calcFRight = document.createElement('div');
            calcFRight.style = 'padding-top: 7px;'
            calcFRight.classList.add('calc-fright');
            const calcResultValue = document.createElement('div');
            calcResultValue.classList.add('calc-result-value');
            calcResultValue.classList.add('result-placeholder-number');
            calcResultValue.classList.add('align-middle');
            calcResultValue.textContent = convertedNumber;
            calcFRight.appendChild(calcResultValue);
            resultRow.appendChild(calcFleft);
            resultRow.appendChild(calcFRight);
        }
    }
});