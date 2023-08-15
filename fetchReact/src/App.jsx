import React, { useState, useEffect } from 'react';
import './App.css';

const url = 'https://restcountries.com/v3.1/all';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  async function fetchCountryData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  }

  const getColorForContinent = (continent) => {
    const colors = {
      Americas: '#FF5733',
      Europe: '#36B1BF',
      Asia: '#8A3FFC',
      Africa: '#1ABC9C',
      Oceania: '#E74C3C',
    };
    return colors[continent] || '#AAAAAA';
  };

  return (
    <div className="container">
      <h1 className="title">Lista de Países</h1>
      <div className="country-list">
        {countries.map((country, index) => (
          <div className="country-item" key={index}>
            <div className="country-flag">
              <img
                src={country.flags.png}
                alt={`${country.name.common} Flag`}
                className="flag-image"
              />
            </div>
            <div className="country-details">
              <h2 className="country-name">{country.name.common}</h2>
              <p className="country-info">
                Sigla: {country.cca2} | Continente: {country.region}
              </p>
              <p className="country-info">
                População: {country.population}
              </p>
            </div>
            <div
              className="continent-color"
              style={{ backgroundColor: getColorForContinent(country.region) }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
