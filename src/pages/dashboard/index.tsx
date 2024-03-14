import { useContext } from "react";
import { useGetExpenses, useGetLimit } from "src/api/apis";
import { StateContext } from "src/app/app";
import { CenteredLoader, CenteredText } from "src/components/shared-components"
import { StyledContainer } from "src/components/styled-components"

import GaugeChart from "src/components/GaugeChart";
import DashboardStats from "src/components/DashboardStats";
import PieChart from "src/components/PieChart";
import ColumnChart from "src/components/ColumnChart";
import { getMonth } from "date-fns";

const Dashboard = () => {
	const { appState } = useContext(StateContext) || {};
  const { user } = appState || {};
  const { data, isLoading, error } = useGetExpenses({ id: user?.id || '' });
  const { data: limit } = useGetLimit();
	const expenses = data?.expenses || [];
  const expenseLimit = parseFloat(limit?.limit || '0') as number;
  const currentMonth = getMonth(new Date());

	return (
		<StyledContainer>
			<CenteredText variant='h2' color="primary"> Dashboard </CenteredText>
			{error && <CenteredText variant='h6'> Unable to get expenses </CenteredText>}
			{isLoading && <CenteredLoader />}
			{data && (
			<>
				<DashboardStats expenses={expenses} expenseLimit={expenseLimit} currentMonth={currentMonth} />
				<GaugeChart expenses={expenses} currentMonth={currentMonth} expenseLimit={expenseLimit} />
				<PieChart expenses={expenses} currentMonth={currentMonth} />
				<ColumnChart expenses={expenses} currentMonth={currentMonth} />
			</>
			)}
		</StyledContainer>
	)
}

export default Dashboard