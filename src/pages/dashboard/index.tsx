import { CenteredText } from "src/components/shared-components"
import { RowWrapContainer, StyledContainer } from "src/components/styled-components"
import GaugeChart from "src/components/GaugeChart";
import DashboardStats from "src/components/DashboardStats";
import PieChart from "src/components/PieChart";
import ColumnChart from "src/components/ColumnChart";

const Dashboard = () => {
	return (
		<StyledContainer>
			<CenteredText variant='h2' color="primary"> Dashboard </CenteredText>
			<DashboardStats />
			<RowWrapContainer>
				<GaugeChart />
				<PieChart />
				<ColumnChart />
			</RowWrapContainer>
		</StyledContainer>
	)
}

export default Dashboard