import { Paper, TextField, Theme, styled } from '@mui/material'

export const bgGradient = (theme: Theme) => `
  linear-gradient(
    to bottom,
    ${theme.palette.secondary.contrastText},
    ${theme.palette.primary.main}
  )
`;

export const StyledBGContainer = styled('div')(({ theme }) =>`
	background-image: ${bgGradient(theme)};
	height: 100vh;
	overflow-y: scroll;
	padding-bottom: ${theme.spacing(50)};
`);

export const CenterContainer = styled('div')(({ theme }) =>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`);

export const StyledTextField = styled(TextField)(({ theme }) =>`
	height: 75px;
	margin: ${theme.spacing(1)} 0px;
	width: 250px;
`);

export const StyledPaper = styled(Paper)(({ theme }) =>`
	padding: ${theme.spacing(2)};
  min-height: 1000px;
  display: flex;
  flex-direction: column;
	overflow-x: auto;
`);

export const VerticalFieldsContainer = styled('div')(({ theme }) =>`
	display: flex;
	flex-direction: column;
	margin: ${theme.spacing(1)} ${theme.spacing(2)};
`);

export const CenteredView = styled('div')(({ theme }) =>`
	margin: ${theme.spacing(5)} auto;
	text-align: center;
`);

export const FullCenteredView = styled('div')(({ theme }) =>`
	position: absolute;
	top: 50vh;
	left: 50vw;
`);

export const Spacer = styled('div')<{margin?: string}>(({ theme, margin }) =>`
	margin: ${margin || theme.spacing(1) + ' ' + theme.spacing(1)};
`);

export const RowWrapContainer = styled('div')(({ theme }) =>`
	display: flex;
	flex: 1;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`);
