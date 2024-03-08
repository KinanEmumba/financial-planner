import { IconButton, Toolbar, styled } from "@mui/material";

export const StyledToolbar = styled(Toolbar)(({ theme }) =>`
	display: flex;
	justify-content: space-evenly;
`);

export const StyledLinkButton = styled(IconButton)(({ theme }) =>`
	display: flex;
	background: transparent;
	color: ${theme.palette.text.primary};
	font-size: calc(16px + 0.3vw);
	font-weight: 400;
`);

export const StyledDashboard = styled('div')(({ theme }) =>`
  
`);