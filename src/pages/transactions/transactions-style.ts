import { Fab, styled } from "@mui/material";

export const StyledFab = styled(Fab)(({ theme }) =>`
	position: fixed;
	top: auto;
	right: ${theme.spacing(10)};
	bottom: ${theme.spacing(8)};
	left: auto;
`);