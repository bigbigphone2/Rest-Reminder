import React, { useState } from 'react';
import Header from './components/Header';
import RestReminder from './components/RestReminder';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSilentMode, setIsSilentMode] = useState<boolean>(false);

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
    </ThemeProvider>
  );
};

export default App;
