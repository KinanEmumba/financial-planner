import { CenterAlignedText } from "src/components/shared-components"
import { RowWrappingContainer, StyledBGContainer } from "src/components/styled-components"
import GaugeChart from "src/components/GaugeChart"
import DashboardStats from "src/components/DashboardStats"
import PieChart from "src/components/PieChart"
import ColumnChart from "src/components/ColumnChart"

const Dashboard = () => {
	return (
		<StyledBGContainer>
			<CenterAlignedText variant='h2' color="primary"> Dashboard </CenterAlignedText>
			<DashboardStats />
			<RowWrappingContainer>
				<GaugeChart />
				<PieChart />
				<ColumnChart />
			</RowWrappingContainer>
		</StyledBGContainer>
	)
}

export default Dashboard