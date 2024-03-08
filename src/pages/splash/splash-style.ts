import { styled } from "@mui/material";

export const CenterContainer = styled('div')(({ theme }) =>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 720px;
`);
	
export const SingleRowContainer = styled('div')(({ theme }) =>`
	display: flex;
	flex-direction: column;
	// justify-content: center;
	// align-items: center;
	margin: 20px;
`);

export const StyledTitle = styled('div')(({ theme }) =>`
	background: transparent;
	color: ${theme.palette.text.secondary};
	font-size: calc(60px + 0.3vw);
	font-weight: 400;
	font-family: ${theme.typography.fontFamily};
	text-align: center;
`);

