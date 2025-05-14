import { useState, useEffect } from 'react';
import ConverterForm from './components/ConverterForm';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';
export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <div className="container">
      <h1>Conversor de Moedas</h1>
      <div className="header-container">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div style={{marginLeft: '200px'}}>
      <ConverterForm />
      </div>
    </div>
  );
}
