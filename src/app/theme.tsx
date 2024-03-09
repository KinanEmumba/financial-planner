import { blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		mode: 'light',
    primary: {
      main: '#263238',
      contrastText: blueGrey[50], // #eceff1
    },
    secondary: {
      main: '#f50057',
      contrastText: blueGrey[50],
    },
    background: {
      default: '#263238',
    },
	},
	typography: {
		fontFamily: 'Roboto',
	},
});