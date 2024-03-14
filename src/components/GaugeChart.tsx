import { useMemo } from 'react';
import { Gauge } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import { createDashboardData, guageConfigMaker } from 'src/utils/helper-functions';
import { ExpenseDataType } from 'src/utils/shared-types';

const GaugeChart = ({
	expenses,
	currentMonth,
	expenseLimit
}: {
	expenses: ExpenseDataType[],
	currentMonth: number,
	expenseLimit: number,
}) => {
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