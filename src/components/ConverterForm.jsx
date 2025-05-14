import { useState } from 'react';
import '../styles/ConverterForm.css';

const currencyToCountry = {
  USD: 'us',
  BRL: 'br',
  EUR: 'eu',
  GBP: 'gb',
  JPY: 'jp',
  CAD: 'ca',
  AUD: 'au',
};

const currencyList = Object.keys(currencyToCountry);

export default function ConverterForm() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState('');
  const [converted, setConverted] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleConvert = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(
        `https://save-cambio-backend.onrender.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId); 

      if (!res.ok) throw new Error(`Erro: ${res.statusText}`);

      const data = await res.json();
      setConverted(data.converted);
    } catch (err) {
      setError(err.name === "AbortError"
        ? "A requisição demorou muito. Tente novamente."
        : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="converter-form">
      <div className="row">
        <label>De:</label>
        <div className="currency-select">
          <img src={`https://flagcdn.com/24x18/${currencyToCountry[fromCurrency]}.png`} alt="" />
          <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
            {currencyList.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <label>Para:</label>
        <div className="currency-select">
          <img src={`https://flagcdn.com/24x18/${currencyToCountry[toCurrency]}.png`} alt="" />
          <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
            {currencyList.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <label>Valor:</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>

      <button style={{ marginLeft: '-200px' }} onClick={handleConvert}>Converter</button>
      {isLoading && (
        <div className="loading-message">Convertendo...</div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}

      {converted !== null && !isNaN(converted) && (
        <div className="result">
          <strong>Resultado:</strong> {Number(converted).toFixed(2)} {toCurrency}
        </div>
      )}

    </div>
  );
}
