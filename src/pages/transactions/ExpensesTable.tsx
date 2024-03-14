import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	useTheme
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ExpenseDataType, ExpenseType } from 'src/utils/shared-types';
import { EditDeleteButton, StyledTableCell } from './transactions-style';

const ExpensesTable = ({
	expenses,
	onEdit,
	onDelete
}: {
	expenses?: ExpenseDataType[],
	onEdit: ({index}: {index: number}) => void
	onDelete: ({index}: {index: number}) => void
}) => {
	const theme = useTheme();
	
	return (
		<Box>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell><Typography variant="h5">Date</Typography></TableCell>
						<TableCell><Typography variant="h5">Category</Typography></TableCell>
						<TableCell><Typography variant="h5">Amount</Typography></TableCell>
						<TableCell><Typography variant="h5">Description</Typography></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses?.map((row, index) => (
						<TableRow key={index}>
							<StyledTableCell>{new Date(row.date).toLocaleDateString()}</StyledTableCell>
							<StyledTableCell>{row.category}</StyledTableCell>
							<StyledTableCell sx={{color: row.type === ExpenseType.credit ? theme.palette.success.main : theme.palette.error.main}}>
								{row.amount}
							</StyledTableCell>
							<StyledTableCell>{row.description}</StyledTableCell>
							<StyledTableCell>
								<EditDeleteButton
									sx={{margin: '10px'}}
									variant="outlined"
									endIcon={<EditNoteIcon />}
									onClick={() => onEdit({index})}>
										Edit
								</EditDeleteButton>
								<EditDeleteButton
									sx={{margin: '10px'}}
									variant="contained"
									endIcon={<DeleteForeverIcon />}
									onClick={() => onDelete({index})}>
										Delete
								</EditDeleteButton>
							</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	)
}

export default ExpensesTable