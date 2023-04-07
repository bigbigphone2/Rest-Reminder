import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import RestReminder from './components/RestReminder';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingPage from './LoadingPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSilentMode, setIsSilentMode] = useState<boolean>(false);

  //detect system light mode/ dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => setIsDarkMode(event.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSilentMode = () =>{
    setIsSilentMode(!isSilentMode);
  }

  const theme = createTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LoadingPage isDarkMode={isDarkMode}>
        <CssBaseline />
        <Header
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
          isSilentMode={isSilentMode}
          handleSilentMode={handleSilentMode}
        />
        <RestReminder
          isDarkMode={isDarkMode}
          isSilentMode={isSilentMode}
        />
      </LoadingPage>
    </ThemeProvider>
  );
};

export default App;
