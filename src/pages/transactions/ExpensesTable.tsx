
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { ExpenseDataType } from 'src/utils/shared-types';

const ExpensesTable = ({expenses}: {expenses?: ExpenseDataType[]}) => {
	console.log('table has expenses', expenses);
	const totalAmount = expenses?.reduce((sum, entry) => sum + entry.amount, 0);
	return (
		<Box>
			<Table aria-label="basic table">
				<TableHead>
					<TableRow>
						<TableCell><Typography variant="h5">Amount</Typography></TableCell>
						<TableCell><Typography variant="h5">Category</Typography></TableCell>
						<TableCell><Typography variant="h5">Date</Typography></TableCell>
						<TableCell><Typography variant="h5">Description</Typography></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses?.map((row, index) => (
						<TableRow key={index}>
							<TableCell>{row.amount}</TableCell>
							<TableCell>{row.category}</TableCell>
							<TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
							<TableCell>{row.description}</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold' }}>
							Total: {totalAmount}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	)
}

export default ExpensesTable