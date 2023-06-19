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

    const convertedValue = currencyInputValue / dolarToday

    let Real= new Intl.NumberFormat("pt-BR", {style: 'currency',
    currency: 'BRL',})

    let Dolar = new Intl.NumberFormat("en-US", {style: 'currency',
    currency: 'USD',})

    let Euro = new Intl.NumberFormat("en-DE", {style: 'currency',
    currency: 'EUR',})

    if (selectedOption == "Dolar") {

        initialValue.innerHTML = Real.format(currencyInputValue)
        finalValue.innerHTML = Dolar.format(convertedValue)

    } else if (selectedOption == "Euro") {

        finalCurrencyImage.src = "./assets/Euro.png"
        finalCurrency.innerHTML = "Euro"
        initialValue.innerHTML = Real.format(currencyInputValue)
        finalValue.innerHTML = Euro.format(convertedValue)

    }
    
}

function changeInputValue (){
    
    if (currencyInput.value !="") {
        currencyInput.value = parseFloat(currencyInput.value.replace(/\//g, ""))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, "/");
      }

}

convertButton.addEventListener("click", convertValues)

currencyInput.addEventListener("input", changeInputValue)
