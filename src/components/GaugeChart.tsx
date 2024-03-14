import { useMemo } from 'react';
import { Gauge } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import { CenteredText } from './shared-components'
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
  const guageConfig = useMemo(() => guageConfigMaker(expenseLimit, totalExpense), [expenseLimit, totalExpense]);

  return (
    <StyledCard>
      <Gauge {...guageConfig} />
      <CenteredText variant="h6">
        {`Monthly Limit: ${totalExpense} of ${expenseLimit}`}
      </CenteredText>
    </StyledCard>
  );
}

export default GaugeChart