import { CenteredLoader, CenteredText } from "src/components/shared-components"
import { StyledContainer } from "src/components/styled-components"
import GaugeChart from "src/components/GaugeChart";
import DashboardStats from "src/components/DashboardStats";
import PieChart from "src/components/PieChart";
import ColumnChart from "src/components/ColumnChart";
import useExpenses from "src/shared-hooks/useExpenses";

const Dashboard = () => {
  const { expenses, isLoading, error } = useExpenses();

	return (
		<StyledContainer>
			<CenteredText variant='h2' color="primary"> Dashboard </CenteredText>
			{error && <CenteredText variant='h6'> Unable to get expenses </CenteredText>}
			{isLoading && <CenteredLoader />}
			{expenses && (
			<>
				<DashboardStats />
				<GaugeChart />
				<PieChart />
				<ColumnChart />
			</>
			)}
		</StyledContainer>
	)
}

export default Dashboard