import { useMemo } from 'react';
import { getMonth } from 'date-fns';

import useExpenses from 'src/shared-hooks/useExpenses';
import useExpensesLimit from 'src/shared-hooks/useExpenseLimit';
import { CenteredLoader, CenteredText, KeyValueRow } from 'src/components/shared-components'
import { createDashboardData } from 'src/utils/helper-functions';
import { StyledDashboardStats } from 'src/pages/dashboard/dashboard-style';

const DashboardStats = () => {
	const { expenses } = useExpenses();
	const { expenseLimit, expensesLimitLoading, expenseLimitError  } =	useExpensesLimit();
	const currentMonth = getMonth(new Date());


  const dashboardData = useMemo(
    () => createDashboardData(expenses, currentMonth, expenseLimit),
    [currentMonth, expenses, expenseLimit]
  );
  const { totalExpense, totalIncome, balance } = dashboardData;

  return (
    <StyledDashboardStats>
			{expensesLimitLoading && <CenteredLoader />}
			{expenseLimitError && <CenteredText variant='h6'> {`Unable to get data ${expenseLimitError.message}`} </CenteredText>}
			{expenseLimit && (<>
				<KeyValueRow title={'Total Income:'} value={totalIncome} />
				<KeyValueRow title={'Total Expense:'} value={totalExpense} />
				<KeyValueRow title={'Balance:'} value={balance} />
				<KeyValueRow title={'Limit:'} value={expenseLimit} />
			</>)}
    </StyledDashboardStats>
  );
}

export default DashboardStats