
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { CenteredText } from 'src/components/shared-components';
import { ExpenseDataType } from 'src/utils/shared-types';
import { StyledTableCell } from './transactions-style';

const ExpensesTable = ({expenses}: {expenses?: ExpenseDataType[]}) => {
	console.log('table has expenses', expenses);

	if (!expenses?.length)
	return (
		<CenteredText variant='h6'> Click + icon to start adding expenses </CenteredText>
	);
	const expensesKeys = Object.keys(expenses[0]);
	return (
		<Box>
			<Table aria-label="basic table">
				<TableHead>
					<TableRow>
						{expensesKeys?.map((key, index) => <TableCell key={index}>
							<Typography variant="h5">
								{key.charAt(0).toUpperCase() + key.slice(1)}
							</Typography>
						</TableCell>)}
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses?.map((row, index) => (
						<TableRow key={index}>
							<StyledTableCell valign="top">{new Date(row.date).toLocaleDateString()}</StyledTableCell>
							<StyledTableCell valign="top">{row.category}</StyledTableCell>
							<StyledTableCell>{row.amount}</StyledTableCell>
							<StyledTableCell>{row.description}</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	)
}

export default ExpensesTable