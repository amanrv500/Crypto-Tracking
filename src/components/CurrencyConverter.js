import { useState } from 'react'
import ExchangeRate from "./ExchangeRate";
import axios from 'axios'

const CurrencyConverter = () => {
    const currencies = ['BTC','ETH','USD','XRP','LTC','ADA' ]
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
    const [amount, setamount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setresult] = useState(0)
    const [primarycurrencyExchanged, setprimarycurrencyExchanged] = useState('BTC')
    const [SecondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC')
    
    
    
    const convert = () =>{
        const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: chosenPrimaryCurrency , function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
        headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
        };

        axios.request(options).then((response) => {
	      console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        setresult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
        setprimarycurrencyExchanged(chosenPrimaryCurrency)
        setSecondaryCurrencyExchanged(chosenSecondaryCurrency) 
        }).catch((error) => {
	      console.error(error)
        })
    }

    console.log(exchangeRate)
    return (
      <div className="currency-converter">
        <h2>CurrencyConverter</h2>
        <div className="input-box"> 
          <table>
            <tbody>
              <tr>
                <td>Primary Currency:</td>
                <td>
                  <input type="number"
                   name="currency-amount1"
                   value={amount}
                   onChange={(e) => setamount(e.target.value)}
                   />
                </td>
                <td>
                  <select value={chosenPrimaryCurrency}
                  name="currency-option1"
                  className="currency-option"
                  onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                  >
                  {currencies.map((currency, _index ) => (<option key={_index}>{currency}</option>))}

                  </select>
                </td>
              </tr>
              <tr>
                <td>Secondary Currency:</td>
                <td>
                  <input type="number"
                  name="currency-amount2"
                  value={result}
                  disabled = {true}
                  />
                </td>
                <td>
                  <select value={chosenSecondaryCurrency}
                  name="currency-option2"
                  className="currency-option"
                  onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                  >
                 {currencies.map((currency, _index ) => (<option key={_index}>{currency}</option>))}

                  </select>
                </td>
              </tr>
             </tbody>
          </table>
          <button id="convert-button" onClick={convert}>convert</button>
          </div>
          <ExchangeRate exchangeRate= {exchangeRate}
          chosePrimaryCurrency={primarycurrencyExchanged}
          chosenSecondaryCurrency={SecondaryCurrencyExchanged}>
            Exchange
          </ExchangeRate>
      </div>
    );
}
  
export default CurrencyConverter;
  