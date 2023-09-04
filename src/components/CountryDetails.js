import React from 'react';
import { useDarkMode } from '../DarkModeContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function CountryDetails({ countries }) {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const navigate = useNavigate();


  const backIcon = isDarkMode
    ? require('../images/back-icon-w.svg').default
    : require('../images/back-icon.svg').default;

  const param = useParams();

  const target = param.selectedCountry;
  const detail = countries.find(
    country => country.name.common === target
  );

  if (!detail) {

    navigate('/pageNotFound');

  } else {

    let notAvailable = 'N/A'
    let name = detail.name.common;
    let imgSrc = detail.flags.svg;
    let imgAlt = `${detail.name.common} Flag`;
    let nativeName = Object.values(detail.name.nativeName).length > 0 ? Object.values(detail.name.nativeName)[0].common : name;
    let capital = detail.capital.length > 0 ? detail.capital : notAvailable;
    let population = (detail.population && addCommas(detail.population)) || notAvailable;
    let topLevelDomain = detail.tld.length > 0 ? detail.tld.map((t, i, arr) => `${t}${i + 1 === arr.length ? '' : ', '}`) : notAvailable;
    let subregion = detail.subregion || notAvailable;
    let currencies =
      Object.values(detail.currencies).length > 0
        ? Object.values(detail.currencies).map(
          (currency, i, arr) => `${currency.name}${i + 1 === arr.length ? '' : ', '}`
        )
        : notAvailable;

    let languages =
      Object.values(detail.languages).length > 0
        ? Object.values(detail.languages).map((lang, i, arr) => `${lang}${i + 1 === arr.length ? '' : ', '}`)
        : notAvailable;

    let borderCountries = {};
    if (detail.borders) {
      for (let i = 0; i < countries.length; i++) {
        for (let j = 0; j < detail.borders.length; j++) {
          if (countries[i].cca3 === detail.borders[j]) {
            borderCountries[countries[i].cca3] = countries[i].name.common;
          }
        }
      }
    }

    return (
      <div className="country-details">
        <div className='detail-info-area'>
          <div className='back-button-wrapper link'>
            <div className='back-button'
              onClick={() => navigate(-1)}>
              <img className='icon back-icon' src={backIcon} alt="back-icon" />
              Back</div>
          </div>
          <div className='detail-info-container'>
            <div className="detail-info-container__flag">
              <img src={imgSrc} alt={imgAlt} />
            </div>
            <div className='detail-info-container__outline'>
              <h2 className='country-name'>{name}</h2>

              <div className='data-group-1'>
                <p><span className='data-name'>Native Name: </span>{nativeName}</p>
                <p><span className='data-name'>Subregion: </span>{subregion}</p>
                <p><span className='data-name'>Population: </span>{addCommas(population)}</p>
                <p><span className='data-name'>Capital: </span>{capital}</p>
              </div>

              <div className='data-group-2'>
                <p><span className='data-name'>Top Level Domain: </span>{topLevelDomain}</p>
                <p><span className='data-name'>Languages: </span>{languages}</p>
                <p><span className='data-name'>Currencies: </span>{currencies}</p>
              </div>

              <div className='borders'>
                <p className='data-name'>Border countries:</p>
                {Object.keys(borderCountries).length === 0 ? (
                  <div>No border countries</div>
                ) : (
                  Object.keys(borderCountries).map(cca3 => (
                    <div
                      className='border-country link'
                      key={cca3}
                      onClick={() => navigate(`/${encodeURIComponent(borderCountries[cca3])}`)}
                    >
                      {borderCountries[cca3]}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
