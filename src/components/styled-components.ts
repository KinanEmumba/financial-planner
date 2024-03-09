import { MenuItem, TextField, styled } from '@mui/material';

export const StyledContainer = styled('div')(({ theme }) =>`
	min-height: 1080px;	
	background-image: linear-gradient(
		to bottom,
		${theme.palette.secondary.contrastText},
		${theme.palette.primary.main}
	);
`);

export const StyledMenuItem = styled(MenuItem)(({ theme }) =>`
	// color: ${theme.palette.text.secondary}
`);

export const StyledTextField = styled(TextField)(({ theme }) =>`
	height: 75px;
	margin: 5px 0px;
	width: 250px;
`);

export const StyledUserAvatar = styled('div')(({ theme }) =>`
	display: flex;
`);

