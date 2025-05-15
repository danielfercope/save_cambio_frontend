import { useState, useEffect } from 'react';
import ConverterForm from './components/ConverterForm';
import ThemeToggle from './components/ThemeToggle';
import CurrencyChart from './components/CurrencyChart';
import './styles/App.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currencies, setCurrencies] = useState({
    from: 'USD',
    to: 'BRL'
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const handleCurrencyChange = (from, to) => {
    setCurrencies({ from, to });
  };

  return (
    <div className="container">
      <h1>Conversor de Moedas</h1>
      <div className="header-container">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div style={{ marginLeft: '200px' }}>
        <ConverterForm onCurrencyChange={handleCurrencyChange} />
      </div>
      <div style={{ marginTop: '40px', width: '100%', marginLeft: '-35px' }}>
          <CurrencyChart
            fromCurrency={currencies.from}
            toCurrency={currencies.to}
          />
        </div>
    </div>
    
  );
}