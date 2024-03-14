import { useMemo } from 'react';
import { CenteredText } from './shared-components'
import { createDashboardData } from 'src/utils/helper-functions';
import { ExpenseDataType } from 'src/utils/shared-types';

const DashboardStats = ({
	expenses,
	expenseLimit,
	currentMonth
}: {
	expenses: ExpenseDataType[],
	expenseLimit: number,
	currentMonth: number
}) => {

  const dashboardData = useMemo(
    () => createDashboardData(expenses, currentMonth, expenseLimit),
    [currentMonth, expenses, expenseLimit]
  );
  const { totalExpense, totalIncome, balance } = dashboardData;
	
  return (
    <>
      <CenteredText variant="h6" color="primary"> Total Income: {totalIncome} </CenteredText>
      <CenteredText variant="h6" color="primary"> Total Expense: {totalExpense} </CenteredText>
      <CenteredText variant="h6" color="primary"> Balance: {balance} </CenteredText>
      <CenteredText variant="h6" color="primary"> Limit: {expenseLimit} </CenteredText>
    </>
  );
}

export default DashboardStats