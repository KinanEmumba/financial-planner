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