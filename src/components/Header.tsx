import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Brightness4, Brightness7, VolumeUp, VolumeOff } from "@material-ui/icons";
import React from 'react';
// import BookIcon from '@material-ui/icons/Book';
// import WorkIcon from '@material-ui/icons/Work';

interface HeaderProps {
  isDarkMode: boolean;
  handleDarkMode: () => void;
  isSilentMode: boolean;
  handleSilentMode: () => void;
}

const Header = ({isDarkMode, handleDarkMode, isSilentMode, handleSilentMode}: HeaderProps) => {
  return (
    <AppBar position="static" color={isDarkMode ? 'secondary' : 'primary'}>
      <Toolbar>
        <Typography variant="h6" >
          <Box sx={{ fontWeight: 'bold'}}>Rest Reminder</Box>
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <IconButton color="inherit" onClick={handleDarkMode} >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <IconButton color="inherit" onClick={handleSilentMode} >
            {isSilentMode ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
