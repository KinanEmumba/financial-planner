import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const baseWhite = blueGrey[50];
const baseGrey = blueGrey[800];
const baseBlack = blueGrey[900];


export const theme = createTheme({
	typography: {
    fontFamily: 'Georgia, Serif'
  },
  palette: {
		text: {
			primary: baseWhite,
			secondary: baseBlack,
		},
    primary: {
			main: baseGrey,
    },
    secondary: {
			main: baseWhite,
    },
  },
});