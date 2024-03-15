import { Card, styled } from "@mui/material"

export const StyledCard = styled(Card)(({ theme }) =>`
	box-shadow: 0.5px 0.5px 0.5px 0.5px ${theme.palette.primary.main};
	background: ${theme.palette.primary.light};
	margin: ${theme.spacing(2)};
	width: 500px;
	overflow-X: scroll;
`);

export const StyledDashboardStats = styled(Card)(({ theme }) =>`
	background: ${theme.palette.primary.light};
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
