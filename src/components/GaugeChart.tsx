import { useMemo } from 'react';
import { Gauge } from '@ant-design/charts'
import { getMonth } from 'date-fns';

import useExpenses from 'src/shared-hooks/useExpenses';
import useExpenseLimit from 'src/shared-hooks/useExpenseLimit';
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import { createDashboardData, guageConfigMaker } from 'src/utils/helper-functions';
import { CenteredText } from './shared-components';
import { Spacer } from './styled-components';
import { theme } from 'src/app/theme';

const GaugeChart = () => {
	const { expenses } = useExpenses();
	const { expenseLimit } =	useExpenseLimit();
	const currentMonth = getMonth(new Date());

  const dashboardData = useMemo(
    () => createDashboardData(expenses, currentMonth, expenseLimit),
    [currentMonth, expenses, expenseLimit]
  );
  const { totalExpense } = dashboardData;
  const guageConfig = useMemo(
		() => guageConfigMaker(expenseLimit, totalExpense), [expenseLimit, totalExpense]
	);

  return (
    <StyledCard>
			<Spacer margin={`${theme.spacing(2)} 0px`} />
			<CenteredText variant="h6" color="primary"> {`${totalExpense} out of ${expenseLimit}`} </CenteredText>
      <Gauge {...guageConfig} />
    </StyledCard>
  );
}

export default GaugeChart