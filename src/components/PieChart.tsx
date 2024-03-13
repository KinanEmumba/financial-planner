import { PieConfig, Pie } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'

const PieChart = ({pieConfig}: {pieConfig: PieConfig}) => {
	return (
		<StyledCard>
			<Pie {...pieConfig} />
		</StyledCard>
	)
}

export default PieChart