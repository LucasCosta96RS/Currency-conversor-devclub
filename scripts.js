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

function convertValues() {
    const selectedOption = document.querySelector(".select-to").value
    const inputValue = currencyInput.value
    const valorLimpo = limparMoeda(inputValue)

    let initialValue = document.querySelector(".initial-value")
    let finalValue = document.querySelector(".final-value")
    let finalCurrency = document.querySelector(".final-currency")
    let finalCurrencyImage = document.querySelector(".final-currency-img")
    
    const dolarToday = 5
    const euroToday = 6.2

    const convertedValueDolar = valorLimpo / dolarToday
    const convertedValueEuro = valorLimpo / euroToday

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







