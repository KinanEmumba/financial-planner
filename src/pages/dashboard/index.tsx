import { useContext } from "react";
import { getMonth } from "date-fns";
import { useGetExpenses, useGetLimit } from "src/api/apis";
import { StateContext } from "src/app/app";
import { CenteredLoader, CenteredText } from "src/components/shared-components"
import { StyledContainer } from "src/components/styled-components"
import {
	colConfigMaker,
	createColData,
	createDashboardData,
	createPieData,
	guageConfigMaker,
	pieConfigMaker
} from "src/utils/helper-functions";
import GuageChart from "src/components/GuageChart";
import DashboardStats from "src/components/DashboardStats";
import PieChart from "src/components/PieChart";

import { theme } from "src/app/theme";
import ColumnChart from "src/components/ColumnChart";

const Dashboard = () => {
	const {appState} = useContext(StateContext) || {};
	const {user} = appState || {};
	const { data, isLoading, error } = useGetExpenses({id: user?.id || ''});
	const {data: limit} = useGetLimit();
	const expenseLimit = parseFloat(limit?.limit || '0') as number;
	const expenses = data?.expenses || [];
	const currentMonth = getMonth(new Date());
	const {
		guagePercent,
		totalExpense,
		totalIncome, 
		balance
	} = createDashboardData(expenses, currentMonth, expenseLimit);
	const guageConfig = guageConfigMaker(guagePercent);
	const pieData = createPieData(expenses, currentMonth);
	const pieConfig = pieConfigMaker(pieData);
	const colData = createColData(expenses);
	const colConfig = colConfigMaker(colData, theme.palette.primary.main);

	return (
		<StyledContainer>
			<CenteredText variant='h2' color="primary"> Dashboard </CenteredText>
			<DashboardStats
				totalIncome={totalIncome}
				totalExpense={totalExpense}
				balance={balance}
				expenseLimit={expenseLimit}
			/>
			{error && <CenteredText variant='h6'> Unable to get expenses </CenteredText>}
			{isLoading && <CenteredLoader />}
			{data && <GuageChart guageConfig={guageConfig} totalExpense={totalExpense} expenseLimit={expenseLimit}/>}
			{data && <PieChart pieConfig={pieConfig} />}
			{data && <ColumnChart colConfig={colConfig} />}
		</StyledContainer>
	)
}

export default Dashboard