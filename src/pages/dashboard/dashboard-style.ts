import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) =>`
	margin: 30px auto;
	max-width: 500px;
	max-height: 500px;
	background: white;
	box-shadow: 0.5px 0.5px 0.5px 0.5px ${theme.palette.primary.main};
`);
