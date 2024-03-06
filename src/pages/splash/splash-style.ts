import { TextField, styled } from "@mui/material";

export const CenterContainer = styled('div')(({ theme }) =>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 720px;
`);
	
export const SingleRowContainer = styled('div')(({ theme }) =>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 50px;
`);

export const StyledTitle = styled('div')(({ theme }) =>`
	background: transparent;
	color: ${theme.palette.text.secondary};
	font-size: 80px;
	font-weight: 400;
	font-family: ${theme.typography.fontFamily};
	text-align: center;
`);

export const StyledTextField = styled(TextField)(({ theme }) =>`
	margin-right: 5px;
`);
