import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) =>`
	box-shadow: 0.5px 0.5px 0.5px 0.5px ${theme.palette.primary.main};
	text-align: center;
	background: white;
	margin: ${theme.spacing(2)} auto;
	width: 80vw;
	overflow-X: scroll;
`);
