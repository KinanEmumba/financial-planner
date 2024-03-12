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
import { ExpenseDataType } from 'src/utils/shared-types';
import { StyledTableCell } from './transactions-style';

const ExpensesTable = ({expenses}: {expenses?: ExpenseDataType[]}) => {
	const theme = useTheme();
	console.log('table has expenses', expenses);
	
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
							<StyledTableCell sx={{color: row.type === 'credit' ? theme.palette.success.main : theme.palette.error.main}}>
								{row.amount}
							</StyledTableCell>
							<StyledTableCell>{row.description}</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	)
}

export default ExpensesTable