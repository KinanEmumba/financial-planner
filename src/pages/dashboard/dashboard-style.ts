import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) =>`
	margin: 10px auto;
	min-width: 300px;
	min-height: 250px;
	max-width: 500px;
	max-height: 500px;
	background: transparent;
	box-shadow: 1px 1px 1px 1px ${theme.palette.primary.main};
`);
