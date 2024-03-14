import { styled } from "@mui/material";

export const CategoryExpenseRow = styled('div')(({ theme }) =>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 350px;
	border-bottom: 1px solid rgba(0,0,0,0.1);
`);
