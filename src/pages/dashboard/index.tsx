import { useContext } from "react";
import { Gauge } from "@ant-design/charts";
import { getMonth } from "date-fns";
import { useGetExpenses, useGetLimit } from "src/api/apis";
import { StateContext } from "src/app/app";
import { CenteredLoader, CenteredText } from "src/components/shared-components"
import { StyledContainer } from "src/components/styled-components"
import { createGuageData, guageConfigMaker } from "src/utils/helper-functions";
import { StyledCard } from "./dashboard-style";

const Dashboard = () => {
	const {appState} = useContext(StateContext) || {};
	const {user} = appState || {};
	const { data, isLoading, error } = useGetExpenses({id: user?.id || ''});
	const {data: limit} = useGetLimit();
	const expenseLimit = parseFloat(limit?.limit || '0') as number;
	const {
		guagePercent,
		totalExpense,
		totalIncome, 
		balance
	} = createGuageData(data?.expenses || [], getMonth(new Date()), expenseLimit);
	const config = guageConfigMaker(guagePercent);
	return (
			<StyledContainer>
				<CenteredText variant='h2' color="primary"> Dashboard </CenteredText>
				{error && <CenteredText variant='h6'> Unable to get expenses </CenteredText>}
				{isLoading && <CenteredLoader />}
				{data && (
					<StyledCard>
						<CenteredText variant='h6'color="primary"> Total Income: {totalIncome} </CenteredText>
						<CenteredText variant='h6'color="primary"> Total Expense: {totalExpense} </CenteredText>
						<CenteredText variant='h6'color="primary"> Balance: {balance} </CenteredText>
						<CenteredText variant='h6'color="primary"> Limit: {expenseLimit} </CenteredText>
						<Gauge {...config} />
						<CenteredText variant='h6'>
							{`Monthly Limit: ${totalExpense} of ${expenseLimit}`}
						</CenteredText>
					</StyledCard>
				)}
			</StyledContainer>
	)
}

export default Dashboard