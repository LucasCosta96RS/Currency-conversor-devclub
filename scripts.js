const convertButton = document.querySelector(".convert-button")
const currencyInput = document.getElementById("currency-input")

function formatarMoeda(valor) {
    const numeroLimpo = valor.replace(/\D/g, '')
    const valorNumerico = parseFloat(numeroLimpo) / 100
    const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    return valorFormatado
}

currencyInput.addEventListener("input", function (event) {
    const valorDigitado = event.target.value
    const valorFormatado = formatarMoeda(valorDigitado)
    event.target.value = valorFormatado
})  

function limparMoeda(valor) {
    const numeroLimpo = valor.replace(/\D/g, '');
    return numeroLimpo / 100;
}

async function obterTaxaDeCambio(moeda) {
  try {
    let url;
    if (moeda == 'Dolar') {
      url = 'https://api.exchangerate-api.com/v4/latest/USD';
    } else if (moeda == 'Euro') {
      url = 'https://api.exchangerate-api.com/v4/latest/EUR';
    } else {
      throw new Error('Moeda não suportada');
    }

    const response = await fetch(url);
    const data = await response.json();
    const taxaCambio = data.rates.BRL;
    return taxaCambio;
  } catch (error) {
    console.log('Erro ao obter a taxa de câmbio:', error);
  }
}

async function convertValues() {
    const selectedOption = document.querySelector(".select-to").value
    const inputValue = currencyInput.value
    const valorLimpo = limparMoeda(inputValue)
    const taxaCambio = await obterTaxaDeCambio(selectedOption);

    let initialValue = document.querySelector(".initial-value")
    let finalValue = document.querySelector(".final-value")
    let finalCurrency = document.querySelector(".final-currency")
    let finalCurrencyImage = document.querySelector(".final-currency-img")

    const convertedValueDolar = valorLimpo / taxaCambio
    const convertedValueEuro = valorLimpo / taxaCambio

    let Real = new Intl.NumberFormat("pt-BR", {style: 'currency', currency: 'BRL',})
    let Dolar = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD',})
    let Euro = new Intl.NumberFormat("en-DE", {style: 'currency', currency: 'EUR',})

    
    if (selectedOption == "Dolar") {
        initialValue.innerHTML = Real.format(valorLimpo)
        finalValue.innerHTML = Dolar.format(convertedValueDolar)
    } else if (selectedOption == "Euro") {
        finalCurrencyImage.src = "./assets/Euro.png"
        finalCurrency.innerHTML = "Euro"
        initialValue.innerHTML = Real.format(valorLimpo)
        finalValue.innerHTML = Euro.format(convertedValueEuro)
    }
} 

convertButton.addEventListener("click", convertValues)







