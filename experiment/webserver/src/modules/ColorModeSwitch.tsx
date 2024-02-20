import { Brightness7, DarkMode } from "@mui/icons-material";
import { Fab, IconButton, SxProps, useTheme } from "@mui/material";
import React from "react";

export const ColorModeContext = React.createContext({ 
  toggleColorMode: () => {}
});

export interface ColorModeSwitchProps {
  sx?: SxProps
}

const ColorModeSwitch = (props: ColorModeSwitchProps) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <IconButton sx={props.sx} onClick={() => colorMode.toggleColorMode()} >
      {theme.palette.mode === 'dark' ? <Brightness7 color="inherit"/> : <DarkMode color="inherit"/>} 
    </IconButton>
  );
};

export default ColorModeSwitch
