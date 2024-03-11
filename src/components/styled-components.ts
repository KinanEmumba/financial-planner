import { AppBar, Paper, TextField, styled } from '@mui/material';

export const StyledContainer = styled('div')(({ theme }) =>`
	min-height: 1080px;	
	background-image: linear-gradient(
		to bottom,
		${theme.palette.secondary.contrastText},
		${theme.palette.primary.main}
	);
`);
export const StyledAppBar = styled(AppBar)(({ theme }) =>`
	color: white;
`);

export const StyledTextField = styled(TextField)(({ theme }) =>`
	height: 75px;
	margin: 5px 0px;
	width: 250px;
`);

export const StyledPaper = styled(Paper)(({ theme }) =>`
	padding: 20px;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
	overflow-x: auto;
`);

export const CenteredView = styled('div')(({ theme }) =>`
	margin: 0px auto;
	text-align: center;
`);

export const FullCenteredView = styled('div')(({ theme }) =>`
	margin: auto;
	text-align: center;
`);

