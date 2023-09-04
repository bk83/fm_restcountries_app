import React, { useEffect } from 'react';
import { useDarkMode } from '../DarkModeContext';
import { useNavigate } from 'react-router-dom';


export default function Header () {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleLogoClick = () => {
    navigate('/', {replace: true});
    window.location.reload();
  }

  const icon = isDarkMode
  ? require('../images/dark-mode-icon-w.svg').default
  : require('..//images/dark-mode-icon.svg').default;

  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className='link' onClick={handleLogoClick}>Where in the World?</h1>
        <div className="header__dark-mode-button link" onClick={toggleDarkMode}>
          <img src={icon} alt="dark-mode-icon" />
          <div className="dark-mode-caption">Dark Mode</div>
        </div>
      </div>
    </header>
  );
};
