import { styled } from "@mui/material"

export const CategoryExpenseRow = styled('div')(({ theme }) =>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 350px;
	border-bottom: 1px solid ${theme.palette.primary.dark};
`);

export const FloatingButtonContainer = styled('div')(({ theme }) =>`
	background: ${theme.palette.primary.light};
	position: fixed;
	bottom: 0;
	left: 0;
	text-align: center;
	width: 100%;
	padding: ${theme.spacing(2)};
`);
