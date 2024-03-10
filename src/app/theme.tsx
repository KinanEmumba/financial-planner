import { blueGrey, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const baseWhite = blueGrey[50]; // #eceff1;
const baseBG = blueGrey[900];  // #263238
const basePink = pink['A400']; // #f50057

export const theme = createTheme({
	typography: {
		fontFamily: 'Roboto',
	},
	palette: {
		mode: 'light',
		text: {
			secondary: baseWhite,
		},
    primary: {
      main: baseBG,
			contrastText: baseWhite,
    },
    secondary: {
      main: basePink,
			contrastText: baseWhite,
    },
    background: {
      default: baseBG,
    },
	},
});