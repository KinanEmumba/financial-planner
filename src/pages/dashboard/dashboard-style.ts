import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) =>`
	box-shadow: 0.5px 0.5px 0.5px 0.5px ${theme.palette.primary.main};
	text-align: center;
	background: white;
	margin: ${theme.spacing(2)} auto;
	width: 80vw;
	overflow-X: scroll;
`);

export const StyledDashboardStats = styled(Card)(({ theme }) =>`
	background: transparent;
	box-shadow: 0.5px 0.5px 0.5px 0.5px ${theme.palette.primary.main};
	width: 300px;
	padding: ${theme.spacing(2)};
	margin: ${theme.spacing(2)} auto;
`);

export const FlexRow = styled('div')(({ theme }) =>`
	display: flex;
	flex-direction: row;
`);

export const SingleFlex = styled('div')(({ theme }) =>`
	display: flex;
	flex: 1;
`);
