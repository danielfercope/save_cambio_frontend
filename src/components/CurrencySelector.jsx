import React, { useState } from 'react';
import '../styles/CurrencySelector.css';

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

export default function CurrencySelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const handleSelect = (code) => {
    onChange(code);
    setOpen(false);
  };

  return (
    <div className="currency-selector">
      <div className="selected" onClick={toggleDropdown}>
        <img
          src={`https://flagcdn.com/24x18/${currencyToCountry[selected]}.png`}
          alt=""
        />
        <span>{selected}</span>
        <span className="arrow">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="dropdown">
          {currencyList.map((code) => (
            <div
              key={code}
              className="option"
              onClick={() => handleSelect(code)}
            >
              <img
                src={`https://flagcdn.com/24x18/${currencyToCountry[code]}.png`}
                alt=""
              />
              <span>{code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
