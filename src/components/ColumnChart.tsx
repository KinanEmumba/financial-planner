import { Column, ColumnConfig } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import ChartDropdown from './ChartDropdown';

const ColumnChart = ({colConfig}: {colConfig: ColumnConfig}) => {
	return (
		<StyledCard>
			<ChartDropdown />
			<Column {...colConfig} />;
		</StyledCard>
	)
}

export default ColumnChart