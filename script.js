let currenciesUrl = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
let coinsUrl = 'https://api.coingecko.com/api/v3/coins/list';
let priceExample = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah'


//write a function what will recieve 2 arguments (coin_id, currency_id))
//and will return price_url by example

function getPriceUrl(coin_id, currency_id) {
  return `https://api.coingecko.com/api/v3/simple/price?ids=${coin_id}&vs_currencies=${currency_id}`;
}


//! get coins list and generate all options for select box

//fetch coin list
// fetch(coinsUrl)
//   .then(res => res.json())
//   .then(data => {
//     renderCoinsList(data)
//   })
renderCoinsList([{
										"id": "ethereum",
										"symbol": "eth",
										"name": "Ethereum"
								},{
										"id": "bitcoin",
										"symbol": "btc",
										"name": "Bitcoin"
								},])


//per every coin add option to select box
//1 find element in DOM tree, 
//2 create option element, set its value and innerText
//3 append option to select box

function renderCoinsList(coinsList) {
  let el = document.querySelector('#coin-list')
  for (let i = 0; i < coinsList.length; i++) {
    let option = document.createElement('option')
    option.value = coinsList[i].id;
    option.innerText = coinsList[i].name;
    el.append(option)
    // {
    // 	"id": "bitcoin-free-cash",
    // 	"symbol": "bfc",
    // 	"name": "Bitcoin Free Cash"
    // }
  }
}


//the same for currencies list 

fetch(currenciesUrl)
  .then(res => res.json())
  .then(data => {
    renderCurrenciesList(data);
  });


function renderCurrenciesList(currenciesList) {
  let el = document.querySelector('#currencies-list');
  for (let i = 0; i < currenciesList.length; i++) {
    let option = document.createElement('option');
    option.value = currenciesList[i];
    option.innerText = currenciesList[i];
    el.append(option);
  }
}




//further study 
// add click event to button and get result using getPriceUrl

const btnConvert = document.querySelector('#btn-convert');

btnConvert.addEventListener('click', function() {
  const coinSelect = document.querySelector('#coin-list');
  const currenciesSelect = document.querySelector('#currencies-list');
  const inputAmount = document.querySelector('#input-amount');
  const answerAmount = document.querySelector('#answer-amount');

  let url = getPriceUrl(coinSelect.value, currenciesSelect.value);


  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
     // let result = data;
		//	console.log(data)

      // const [value] = Object.values(result);
      // const [value2] = Object.values(value);
			let price = result[coinSelect.value][currenciesSelect.value]
      answerAmount.value = inputAmount.value * price;
    });
});
