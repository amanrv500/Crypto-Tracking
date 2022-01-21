const ExchangeRate = ({exchangeRate, chosePrimaryCurrency, chosenSecondaryCurrency}) => {
    return (
      <div className="exchange-rate">
          <h3>ExchangeRate</h3>
          <h1> {exchangeRate}</h1>
          <p>{chosePrimaryCurrency} to {chosenSecondaryCurrency}</p>
      </div>
    );
  }
  
export default ExchangeRate;
  