import React from 'react';
import { useDarkMode } from '../DarkModeContext';

export default function SearchFilter ({ searchQuery, selectedRegion, handleSearchChange, handleRegionChange }) {

  const regions = ['All region', 'Africa', 'Asia', 'Americas', 'Europe', 'Oceania'];
  const { isDarkMode } = useDarkMode();

  const searchIcon = isDarkMode
    ? require('../images/search-icon-w.svg').default
    : require('../images/search-icon.svg').default;
  const arrowIcon = isDarkMode
    ? require('../images/select-box-arrow-w.svg').default
    : require('../images/select-box-arrow.svg').default;

  const openOptoins = () => {
      const targetElements = document.querySelectorAll('.region-filter__select-options, .select-box-arrow');
      targetElements.forEach(element => {
        element.classList.toggle('open');
    });
    }

  return (
      <div className='search-area'>
        <div className='search-container'>
          <img className='icon' src={searchIcon} alt="search-icon" />
          <input
            className='search-box'
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="region-filter">
          <div className="region-filter__select-box" onClick={() => openOptoins()}>
            {selectedRegion}
            <img className='icon select-box-arrow' src={arrowIcon} alt="arrow-icon" />
          </div>
          <div className="region-filter__select-options">
            {regions.map(region => (
              <div key={region}
                className={`select-option ${region === selectedRegion ? 'selected' : ''}`}
                onClick={() => {
                  handleRegionChange(region);
                  openOptoins();
                }}
              >
                {region}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
