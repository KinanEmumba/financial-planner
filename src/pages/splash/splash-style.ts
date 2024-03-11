import { styled } from "@mui/material";

export const CenterContainer = styled('div')(({ theme }) =>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 720px;
`);
	
export const SplashFieldsContainer = styled('div')(({ theme }) =>`
	display: flex;
	flex-direction: column;
	margin: 20px;
`);

export const StyledTitle = styled('div')(({ theme }) =>`
	background: transparent;
	color: ${theme.palette.primary.main};
	font-size: calc(60px + 0.3vw);
	font-weight: 400;
	text-align: center;
`);

