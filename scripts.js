const convertButton = document.querySelector(".convert-button")

let currencyInput = document.querySelector(".currency-input")

const currencyInputValue = document.querySelector(".currency-input").value
    

function convertValues() {
    
    const selectedOption = document.querySelector(".select-to").value

    let initialValue = document.querySelector(".initial-value")

    let finalValue = document.querySelector(".final-value")

    let finalCurrency = document.querySelector(".final-currency")

    let finalCurrencyImage = document.querySelector(".final-currency-img")
    
    const dolarToday = 5

    const euroToday = 6.2

    const convertedValueDolar = currencyInputValue / dolarToday

    const convertedValueEuro = currencyInputValue / euroToday

    let Real = new Intl.NumberFormat("pt-BR", {style: 'currency',
    currency: 'BRL',})

    let Dolar = new Intl.NumberFormat("en-US", {style: 'currency',
    currency: 'USD',})

    let Euro = new Intl.NumberFormat("en-DE", {style: 'currency',
    currency: 'EUR',})

    if (selectedOption == "Dolar") {

        initialValue.innerHTML = Real.format(currencyInputValue)
        finalValue.innerHTML = Dolar.format(convertedValueDolar)

    } else if (selectedOption == "Euro") {

        finalCurrencyImage.src = "./assets/Euro.png"
        finalCurrency.innerHTML = "Euro"
        initialValue.innerHTML = Real.format(currencyInputValue)
        finalValue.innerHTML = Euro.format(convertedValueEuro)

    }

    
}

convertButton.addEventListener("click", convertValues)

function formatarMoeda(valor) {
    const valorNumerico = parseFloat(valor) / 100;
    const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return valorFormatado;
  }

  currencyInput = document.getElementsByClassName("currency-input");

  currencyInput.addEventListener('input', function (input) {
    const valorDigitado = input.target.value;
    const valorFormatado = formatarMoeda(valorDigitado);
    input.target.value = valorFormatado;
  });



