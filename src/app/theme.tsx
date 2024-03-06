import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

export const themeColor = '#5acba1';
export const themeColorLight = '#5acba150';
export const iceBlue = blue[700];

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5acba1',
    },
    secondary: {
      main: '#000000',
    },
  },
});