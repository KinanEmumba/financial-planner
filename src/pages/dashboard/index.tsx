import { Gauge } from "@ant-design/charts";
import { getMonth } from "date-fns";
import { useContext } from "react";
import { StateContext } from "src/app/app";
import { CenteredText } from "src/components/shared-components"
import { StyledPaper } from "src/components/styled-components"
import { getMonthExpenses, guageConfigMaker } from "src/utils/helper-functions";

const Dashboard = () => {
	const {appState} = useContext(StateContext) || {};
	const {monthlyExpenseLimit, expenses} = appState || {};
	const monthExpenses = getMonthExpenses(expenses || [], getMonth(new Date()));
	console.log('current month', monthExpenses);
	const config = guageConfigMaker();
	return (
		<StyledPaper>
			<CenteredText variant='h2'> Dashboard </CenteredText>
			<CenteredText variant='h2'> {monthlyExpenseLimit} </CenteredText>
			<Gauge {...config} />
		</StyledPaper>
	)
}

export default Dashboard