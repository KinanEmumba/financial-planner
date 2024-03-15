import { Box, Fab, TableCell, styled } from "@mui/material";

import { bgGradient } from "src/components/styled-components";

export const StyledFab = styled(Fab)(({ theme }) =>`
	position: fixed;
	top: auto;
	right: ${theme.spacing(10)};
	bottom: ${theme.spacing(8)};
	left: auto;
`);

export const StyledTableCell = styled(TableCell)(({ theme }) =>`
	vertical-align: top;
	font-size: ${theme.typography.body1.fontSize}
`);

export const StyledModalBox = styled(Box)(({ theme }) =>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  boxShadow: 24;
	padding: ${theme.spacing(2)};
	background-image: ${bgGradient(theme)};
`);