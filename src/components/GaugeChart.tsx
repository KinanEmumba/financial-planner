import { useMemo } from 'react';
import { Gauge } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import { createDashboardData, guageConfigMaker } from 'src/utils/helper-functions';
import useExpenses from 'src/shared-hooks/useExpenses';
import { getMonth } from 'date-fns';
import useExpenseLimit from 'src/shared-hooks/useExpenseLimit';

const GaugeChart = () => {
	const { expenses } = useExpenses();
	const { expenseLimit } =	useExpenseLimit();
	const currentMonth = getMonth(new Date());

  const dashboardData = useMemo(
    () => createDashboardData(expenses, currentMonth, expenseLimit),
    [currentMonth, expenses, expenseLimit]
  );
  const { totalExpense } = dashboardData;
  const guageConfig = useMemo(() => guageConfigMaker(
		expenseLimit,
		totalExpense,
		`Monthly Limit: ${totalExpense} of ${expenseLimit}`
	), [expenseLimit, totalExpense]);

  return (
    <StyledCard>
      <Gauge {...guageConfig} />
    </StyledCard>
  );
}

export default GaugeChart