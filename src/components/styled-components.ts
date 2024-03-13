import { Paper, TextField, Theme, styled } from '@mui/material';

export const bgGradient = (theme: Theme) => `
  linear-gradient(
    to bottom,
    ${theme.palette.secondary.contrastText},
    ${theme.palette.primary.main}
  )
`;

export const StyledContainer = styled('div')(({ theme }) =>`
	min-height: 1080px;	
	background-image: ${bgGradient(theme)};
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

export const VerticalFieldsContainer = styled('div')(({ theme }) =>`
	display: flex;
	flex-direction: column;
	margin: 20px;
`);

export const CenteredView = styled('div')(({ theme }) =>`
	margin: 0px auto;
	text-align: center;
`);

export const FullCenteredView = styled('div')(({ theme }) =>`
	margin: auto;
	text-align: center;
`);

