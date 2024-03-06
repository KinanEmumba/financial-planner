import { IconButton, Toolbar, styled } from '@mui/material';

export const StyledContainer = styled('div')(({ theme }) =>`
	min-height: 1080px;	
	background-image: linear-gradient(
		to bottom,
		${theme.palette.secondary.main},
		${theme.palette.primary.main}
	);
`);

export const StyledLinkButton = styled(IconButton)(({ theme }) =>`
	background: transparent;
	color: ${theme.palette.text.primary};
	font-size: 20px;
	font-weight: 400;
	border: none;
	margin: 0px 20px;
	padding: 20px;
`);

export const StyledToolbar = styled(Toolbar)(({ theme }) =>`
	justify-content: center;
`);
