import { useMemo } from 'react';
import { getMonth } from 'date-fns';

import { CenteredText } from 'src/components/shared-components'
import { createDashboardData } from 'src/utils/helper-functions';
import useExpenses from 'src/shared-hooks/useExpenses';
import useExpensesLimit from 'src/shared-hooks/useExpenseLimit';
import { Box } from '@mui/material';

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
    <Box>
      <CenteredText variant="h6" color="primary"> Total Income: {totalIncome} </CenteredText>
      <CenteredText variant="h6" color="primary"> Total Expense: {totalExpense} </CenteredText>
      <CenteredText variant="h6" color="primary"> Balance: {balance} </CenteredText>
      <CenteredText variant="h6" color="primary"> Limit: {expenseLimit} </CenteredText>
    </Box>
  );
}

export default DashboardStats