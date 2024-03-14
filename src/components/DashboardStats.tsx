import { useMemo } from 'react';
import { CenteredText } from './shared-components'
import { createDashboardData } from 'src/utils/helper-functions';
import useExpenses from 'src/shared-hooks/useExpenses';
import { getMonth } from 'date-fns';
import useExpensesLimit from 'src/shared-hooks/useExpenseLimit';

const DashboardStats = () => {
	const { expenses } = useExpenses();
	const { expenseLimit } =	useExpensesLimit();
	const currentMonth = getMonth(new Date());

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