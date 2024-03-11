import { blueGrey, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const baseWhite = blueGrey[50]; // #eceff1;
const baseBlack = blueGrey[900];  // #263238
const basePink = pink['A400']; // #f50057

export const theme = createTheme({
	typography: {
		fontFamily: 'Roboto',
		subtitle1: {
			fontSize: '0.75rem',
			'@media (min-width:600px)': {
				fontSize: '1.25rem',
			},
		},
	},
	palette: {
		mode: 'light',
		text: {
			primary: baseBlack,
			secondary: baseWhite,
		},
    primary: {
      main: baseBlack,
			contrastText: baseWhite,
    },
    secondary: {
      main: basePink,
			contrastText: baseWhite,
    },
    background: {
      default: baseBlack,
    },
	},
});