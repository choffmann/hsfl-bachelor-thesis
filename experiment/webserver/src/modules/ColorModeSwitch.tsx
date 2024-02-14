import { Brightness7, DarkMode } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React from "react";

export const ColorModeContext = React.createContext({ 
  toggleColorMode: () => {}
});

const ColorModeSwitch = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <IconButton onClick={() => colorMode.toggleColorMode()} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <DarkMode />} 
    </IconButton>
  );
};

export default ColorModeSwitch
