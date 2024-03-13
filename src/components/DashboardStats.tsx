import { CenteredText } from './shared-components'

const DashboardStats = ({
	totalIncome,
	totalExpense,
	balance,
	expenseLimit
}:{
	totalIncome: number,
	totalExpense: number,
	balance: number,
	expenseLimit: number,
}) => {
	return (
		<>
			<CenteredText variant='h6'color="primary"> Total Income: {totalIncome} </CenteredText>
			<CenteredText variant='h6'color="primary"> Total Expense: {totalExpense} </CenteredText>
			<CenteredText variant='h6'color="primary"> Balance: {balance} </CenteredText>
			<CenteredText variant='h6'color="primary"> Limit: {expenseLimit} </CenteredText>
		</>
	)
}

export default DashboardStats