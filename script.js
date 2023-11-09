const convertButton = document.querySelector(".convert-button");
const currencyInput = document.getElementById("currency-input");

function formatarMoeda(valor) {
  const numeroLimpo = valor.replace(/\D/g, "");
  const valorNumerico = parseFloat(numeroLimpo) / 100;
  const valorFormatado = valorNumerico.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return valorFormatado;
}

currencyInput.addEventListener("input", function (event) {
  const valorDigitado = event.target.value;
  const valorFormatado = formatarMoeda(valorDigitado);
  event.target.value = valorFormatado;
});

function limparMoeda(valor) {
  const numeroLimpo = valor.replace(/\D/g, "");
  return numeroLimpo / 100;
}

async function obterTaxaDeCambioBrl(moeda) {
  try {
    let url;
    if (moeda == "Dolar") {
      url = "https://api.exchangerate-api.com/v4/latest/USD";
    } else if (moeda == "Euro") {
      url = "https://api.exchangerate-api.com/v4/latest/EUR";
    } else if (moeda == "Libra") {
      url = "https://api.exchangerate-api.com/v4/latest/GBP";
    } else {
      throw new Error("Moeda não suportada");
    }

    const response = await fetch(url);
    const data = await response.json();
    const taxaCambio = data.rates.BRL;
    return taxaCambio;
  } catch (error) {
    console.log("Erro ao obter a taxa de câmbio:", error);
  }
}

async function obterTaxaDeCambioEur(moeda) {
  try {
    let url;
    if (moeda == "Dolar") {
      url = "https://api.exchangerate-api.com/v4/latest/USD";
    } else if (moeda == "Euro") {
      url = "https://api.exchangerate-api.com/v4/latest/EUR";
    } else if (moeda == "Libra") {
      url = "https://api.exchangerate-api.com/v4/latest/GBP";
    } else if (moeda == "Real") {
      url = "https://api.exchangerate-api.com/v4/latest/BRL";
    } else {
      throw new Error("Moeda não suportada");
    }

    const response = await fetch(url);
    const data = await response.json();
    const taxaCambio = data.rates.EUR;
    return taxaCambio;
  } catch (error) {
    console.log("Erro ao obter a taxa de câmbio:", error);
  }
}

async function obterTaxaDeCambioUsd(moeda) {
  try {
    let url;
    if (moeda == "Dolar") {
      url = "https://api.exchangerate-api.com/v4/latest/USD";
    } else if (moeda == "Euro") {
      url = "https://api.exchangerate-api.com/v4/latest/EUR";
    } else if (moeda == "Libra") {
      url = "https://api.exchangerate-api.com/v4/latest/GBP";
    } else if (moeda == "Real") {
      url = "https://api.exchangerate-api.com/v4/latest/BRL";
    } else {
      throw new Error("Moeda não suportada");
    }

    const response = await fetch(url);
    const data = await response.json();
    const taxaCambio = data.rates.USD;
    return taxaCambio;
  } catch (error) {
    console.log("Erro ao obter a taxa de câmbio:", error);
  }
}

async function obterTaxaDeCambioGbp(moeda) {
  try {
    let url;
    if (moeda == "Dolar") {
      url = "https://api.exchangerate-api.com/v4/latest/USD";
    } else if (moeda == "Euro") {
      url = "https://api.exchangerate-api.com/v4/latest/EUR";
    } else if (moeda == "Libra") {
      url = "https://api.exchangerate-api.com/v4/latest/GBP";
    } else if (moeda == "Real") {
      url = "https://api.exchangerate-api.com/v4/latest/BRL";
    } else {
      throw new Error("Moeda não suportada");
    }

    const response = await fetch(url);
    const data = await response.json();
    const taxaCambio = data.rates.GBP;
    return taxaCambio;
  } catch (error) {
    console.log("Erro ao obter a taxa de câmbio:", error);
  }
}

async function obterBitcoin(moeda) {
  try {
    let url;
    if (moeda == "Dolar") {
      url = "https://blockchain.info/tobtc?currency=USD&value=1";
    } else if (moeda == "Euro") {
      url = "https://blockchain.info/tobtc?currency=EUR&value=1";
    } else if (moeda == "Libra") {
      url = "https://blockchain.info/tobtc?currency=GBP&value=1";
    } else if (moeda == "Real") {
      url = "https://blockchain.info/tobtc?currency=BRL&value=1";
    } else {
      throw new Error("Moeda não suportada");
    }

    const response = await fetch(url);
    const data = await response.json();
    const taxaCambio = data;
    return taxaCambio;
  } catch (error) {
    console.log("Erro ao obter a taxa de câmbio:", error);
  }
}

async function convertValues() {
  const selectedOptionFrom = document.querySelector(".select-from").value;
  const selectedOptionTo = document.querySelector(".select-to").value;
  const inputValue = currencyInput.value;
  const valorLimpo = limparMoeda(inputValue);
  const taxaCambioBrl = await obterTaxaDeCambioBrl(selectedOptionTo);
  const taxaCambioEur = await obterTaxaDeCambioEur(selectedOptionTo);
  const taxaCambioUsd = await obterTaxaDeCambioUsd(selectedOptionTo);
  const taxaCambioGbp = await obterTaxaDeCambioGbp(selectedOptionTo);
  const bitcoinValueFrom = await obterBitcoin(selectedOptionFrom);
  const bitcoinValueTo = await obterBitcoin(selectedOptionTo);

  let initialValue = document.querySelector(".initial-value");
  let initialCurrency = document.querySelector(".initial-currency");
  let initialCurrencyImage = document.querySelector(".initial-currency-img");
  let arrow = document.querySelector(".result-box.result-arrow");
  let finalValue = document.querySelector(".final-value");
  let finalCurrency = document.querySelector(".final-currency");
  let finalCurrencyImage = document.querySelector(".final-currency-img");

  const convertedValueReal = valorLimpo / taxaCambioBrl;
  const convertedValueEuro = valorLimpo / taxaCambioEur;
  const convertedValueLibra = valorLimpo / taxaCambioGbp;
  const convertedValueDolar = valorLimpo / taxaCambioUsd;
  const convertedValueBitcoinFrom = valorLimpo * bitcoinValueFrom;
  const convertedValueBitcoinTo = valorLimpo / bitcoinValueTo;

  let Real = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  let Dolar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let Euro = new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  });
  let Libra = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  let Bitcoin = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "BTC",
  });

  if (selectedOptionFrom == selectedOptionTo) {
    alert("Você não pode converter de mesma moeda!");
  }

  if (selectedOptionFrom == "Real" && selectedOptionTo == "Dolar") {
    initialCurrencyImage.src = "./assets/Real.png";
    initialCurrency.innerHTML = "Real";
    finalCurrencyImage.src = "./assets/Dolar.png";
    finalCurrency.innerHTML = "Dolar";
    initialValue.innerHTML = Real.format(valorLimpo);
    finalValue.innerHTML = Dolar.format(convertedValueReal);
  } else if (selectedOptionFrom == "Real" && selectedOptionTo == "Euro") {
    initialCurrencyImage.src = "./assets/Real.png";
    initialCurrency.innerHTML = "Real";
    finalCurrencyImage.src = "./assets/Euro.png";
    finalCurrency.innerHTML = "Euro";
    initialValue.innerHTML = Real.format(valorLimpo);
    finalValue.innerHTML = Euro.format(convertedValueReal);
  } else if (selectedOptionFrom == "Real" && selectedOptionTo == "Libra") {
    initialCurrencyImage.src = "./assets/Real.png";
    initialCurrency.innerHTML = "Real";
    finalCurrencyImage.src = "./assets/Libra.png";
    finalCurrency.innerHTML = "Libra";
    initialValue.innerHTML = Real.format(valorLimpo);
    finalValue.innerHTML = Libra.format(convertedValueReal);
  } else if (selectedOptionFrom == "Real" && selectedOptionTo == "Bitcoin") {
    initialCurrencyImage.src = "./assets/Real.png";
    initialCurrency.innerHTML = "Real";
    finalCurrencyImage.src = "./assets/Bitcoin.png";
    finalCurrency.innerHTML = "Bitcoin";
    initialValue.innerHTML = Real.format(valorLimpo);
    finalValue.innerHTML = Bitcoin.format(convertedValueBitcoinFrom);
  }

  if (selectedOptionFrom == "Euro" && selectedOptionTo == "Dolar") {
    initialCurrencyImage.src = "./assets/Euro.png";
    initialCurrency.innerHTML = "Euro";
    finalCurrencyImage.src = "./assets/Dolar.png";
    finalCurrency.innerHTML = "Dolar";
    initialValue.innerHTML = Euro.format(valorLimpo);
    finalValue.innerHTML = Dolar.format(convertedValueEuro);
  } else if (selectedOptionFrom == "Euro" && selectedOptionTo == "Real") {
    initialCurrencyImage.src = "./assets/Euro.png";
    initialCurrency.innerHTML = "Euro";
    finalCurrencyImage.src = "./assets/Real.png";
    finalCurrency.innerHTML = "Real";
    initialValue.innerHTML = Euro.format(valorLimpo);
    finalValue.innerHTML = Real.format(convertedValueEuro);
  } else if (selectedOptionFrom == "Euro" && selectedOptionTo == "Libra") {
    initialCurrencyImage.src = "./assets/Euro.png";
    initialCurrency.innerHTML = "Euro";
    finalCurrencyImage.src = "./assets/Libra.png";
    finalCurrency.innerHTML = "Libra";
    initialValue.innerHTML = Euro.format(valorLimpo);
    finalValue.innerHTML = Libra.format(convertedValueEuro);
  } else if (selectedOptionFrom == "Euro" && selectedOptionTo == "Bitcoin") {
    initialCurrencyImage.src = "./assets/Euro.png";
    initialCurrency.innerHTML = "Euro";
    finalCurrencyImage.src = "./assets/Bitcoin.png";
    finalCurrency.innerHTML = "Bitcoin";
    initialValue.innerHTML = Euro.format(valorLimpo);
    finalValue.innerHTML = Bitcoin.format(convertedValueBitcoinFrom);
  }

  if (selectedOptionFrom == "Dolar" && selectedOptionTo == "Euro") {
    initialCurrencyImage.src = "./assets/Dolar.png";
    initialCurrency.innerHTML = "Dolar";
    finalCurrencyImage.src = "./assets/Euro.png";
    finalCurrency.innerHTML = "Euro";
    initialValue.innerHTML = Dolar.format(valorLimpo);
    finalValue.innerHTML = Euro.format(convertedValueDolar);
  } else if (selectedOptionFrom == "Dolar" && selectedOptionTo == "Real") {
    initialCurrencyImage.src = "./assets/Dolar.png";
    initialCurrency.innerHTML = "Dolar";
    finalCurrencyImage.src = "./assets/Real.png";
    finalCurrency.innerHTML = "Real";
    initialValue.innerHTML = Dolar.format(valorLimpo);
    finalValue.innerHTML = Real.format(convertedValueDolar);
  } else if (selectedOptionFrom == "Dolar" && selectedOptionTo == "Libra") {
    initialCurrencyImage.src = "./assets/Dolar.png";
    initialCurrency.innerHTML = "Dolar";
    finalCurrencyImage.src = "./assets/Libra.png";
    finalCurrency.innerHTML = "Libra";
    initialValue.innerHTML = Dolar.format(valorLimpo);
    finalValue.innerHTML = Libra.format(convertedValueDolar);
  } else if (selectedOptionFrom == "Dolar" && selectedOptionTo == "Bitcoin") {
    initialCurrencyImage.src = "./assets/Dolar.png";
    initialCurrency.innerHTML = "Dolar";
    finalCurrencyImage.src = "./assets/Bitcoin.png";
    finalCurrency.innerHTML = "Bitcoin";
    initialValue.innerHTML = Dolar.format(valorLimpo);
    finalValue.innerHTML = Bitcoin.format(convertedValueBitcoinFrom);
  }

  if (selectedOptionFrom == "Libra" && selectedOptionTo == "Euro") {
    initialCurrencyImage.src = "./assets/Libra.png";
    initialCurrency.innerHTML = "Libra";
    finalCurrencyImage.src = "./assets/Euro.png";
    finalCurrency.innerHTML = "Euro";
    initialValue.innerHTML = Libra.format(valorLimpo);
    finalValue.innerHTML = Euro.format(convertedValueLibra);
  } else if (selectedOptionFrom == "Libra" && selectedOptionTo == "Real") {
    initialCurrencyImage.src = "./assets/Libra.png";
    initialCurrency.innerHTML = "Libra";
    finalCurrencyImage.src = "./assets/Real.png";
    finalCurrency.innerHTML = "Real";
    initialValue.innerHTML = Libra.format(valorLimpo);
    finalValue.innerHTML = Real.format(convertedValueLibra);
  } else if (selectedOptionFrom == "Libra" && selectedOptionTo == "Dolar") {
    initialCurrencyImage.src = "./assets/Libra.png";
    initialCurrency.innerHTML = "Libra";
    finalCurrencyImage.src = "./assets/Dolar.png";
    finalCurrency.innerHTML = "Dolar";
    initialValue.innerHTML = Libra.format(valorLimpo);
    finalValue.innerHTML = Dolar.format(convertedValueLibra);
  } else if (selectedOptionFrom == "Libra" && selectedOptionTo == "Bitcoin") {
    initialCurrencyImage.src = "./assets/Libra.png";
    initialCurrency.innerHTML = "Libra";
    finalCurrencyImage.src = "./assets/Bitcoin.png";
    finalCurrency.innerHTML = "Bitcoin";
    initialValue.innerHTML = Libra.format(valorLimpo);
    finalValue.innerHTML = Bitcoin.format(convertedValueBitcoinFrom);
  }

  if (selectedOptionFrom == "Bitcoin" && selectedOptionTo == "Euro") {
    initialCurrencyImage.src = "./assets/Bitcoin.png";
    initialCurrency.innerHTML = "Bitcoin";
    finalCurrencyImage.src = "./assets/Euro.png";
    finalCurrency.innerHTML = "Euro";
    initialValue.innerHTML = Bitcoin.format(valorLimpo);
    finalValue.innerHTML = Euro.format(convertedValueBitcoinTo);
  } else if (selectedOptionFrom == "Bitcoin" && selectedOptionTo == "Real") {
    initialCurrencyImage.src = "./assets/Bitcoin.png";
    initialCurrency.innerHTML = "Bitcoin";
    finalCurrencyImage.src = "./assets/Real.png";
    finalCurrency.innerHTML = "Real";
    initialValue.innerHTML = Bitcoin.format(valorLimpo);
    finalValue.innerHTML = Real.format(convertedValueBitcoinTo);
  } else if (selectedOptionFrom == "Bitcoin" && selectedOptionTo == "Dolar") {
    initialCurrencyImage.src = "./assets/Bitcoin.png";
    initialCurrency.innerHTML = "Bitcoin";
    finalCurrencyImage.src = "./assets/Dolar.png";
    finalCurrency.innerHTML = "Dolar";
    initialValue.innerHTML = Bitcoin.format(valorLimpo);
    finalValue.innerHTML = Dolar.format(convertedValueBitcoinTo);
  } else if (selectedOptionFrom == "Bitcoin" && selectedOptionTo == "Libra") {
    initialCurrencyImage.src = "./assets/Bitcoin.png";
    initialCurrency.innerHTML = "Bitcoin";
    finalCurrencyImage.src = "./assets/Libra.png";
    finalCurrency.innerHTML = "Libra";
    initialValue.innerHTML = Bitcoin.format(valorLimpo);
    finalValue.innerHTML = Bitcoin.format(convertedValueBitcoinTo);
  }
}

convertButton.addEventListener("click", convertValues);
