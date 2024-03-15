import { CenteredText } from "src/components/shared-components"
import { StyledContainer } from "src/components/styled-components"
import GaugeChart from "src/components/GaugeChart";
import DashboardStats from "src/components/DashboardStats";
import PieChart from "src/components/PieChart";
import ColumnChart from "src/components/ColumnChart";
import { DashboardContainer } from "./dashboard-style";

const Dashboard = () => {
	return (
		<StyledContainer>
			<CenteredText variant='h2' color="primary"> Dashboard </CenteredText>
			<DashboardStats />
			<DashboardContainer>
				<GaugeChart />
				<PieChart />
				<ColumnChart />
			</DashboardContainer>
		</StyledContainer>
	)
}

export default Dashboard