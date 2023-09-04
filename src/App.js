import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All region');

  const apiURL = 'https://restcountries.com/v3.1/all';
  const param = 'name,tld,cca2,cca3,capital,subregion,region,population,nativeName,currencies,languages,flags,borders';

  useEffect(() => {
    fetch(`${apiURL}?fields=${param}`)
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const home = (
    <>
      <SearchFilter
        searchQuery={searchQuery}
        selectedRegion={selectedRegion}
        handleSearchChange={handleSearchChange}
        handleRegionChange={handleRegionChange}
      />
      <CountryList
        countries={countries}
        searchQuery={searchQuery}
        selectedRegion={selectedRegion}
      />
    </>
  );
  


  return (
    <div>
      <Header />
        <Routes>
          <Route path='/'
                 element={home}
          />
          <Route path='/:selectedCountry'
                 element={
                          <CountryDetails
                          countries={countries}
                        />}
          />
          <Route path='/*'
                element={home}
          />
        </Routes>
        
    </div>
  );
};


export default App;
