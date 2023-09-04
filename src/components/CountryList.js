import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CountryList ({ countries, searchQuery, selectedRegion }) {
    
    const navigate = useNavigate();

    function addCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const filteredCountries = countries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = selectedRegion === 'All region' || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    return (
        <div className="country-list">
            {filteredCountries.map(country => (
                <div
                    key={country.cca3}
                    onClick={() => navigate(`/${encodeURIComponent(country.name.common)}`)}
                    className='item-container'
                >
                    <div className='item-container__flag'>
                        <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
                    </div>
                    <div className='item-container__outline'>
                        <h2 className='item-container__outline__country-name'>{country.name.common}</h2>
                        <p className='item-container__outline__data'>
                            <span className='data-name'>Population: </span>
                            {addCommas(country.population)}
                        </p>
                        <p className='item-container__outline__data'>
                            <span className='data-name'>Region: </span>
                            {country.region}
                        </p>
                        <p className='item-container__outline__data'>
                            <span className='data-name'>Capital: </span>
                            {country.capital}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
