import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) =>`
	text-align: center;
	margin: 30px auto;
	max-width: 500px;
	max-height: auto;
	background: white;
	box-shadow: 0.5px 0.5px 0.5px 0.5px ${theme.palette.primary.main};
`);
