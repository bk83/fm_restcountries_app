import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const isDarkModeCookie = Cookies.get('isDarkMode');
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeCookie === 'true' || false);

  useEffect(() => {
    Cookies.set('isDarkMode', isDarkMode.toString(), { expires: 7, path: '/' });
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
