import { Bar, BarConfig } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import ChartDropdown from './ChartDropdown';
import { theme } from 'src/app/theme';

const BarChart = ({barConfig}: {barConfig: BarConfig}) => {
	const data = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 15 },
    { category: 'D', value: 25 },
  ];

  // Configuration options for the bar chart
  const config = {
    data: data,
    xField: 'category',
    yField: 'value',
    height: 100,
    barStyle: { fill: theme.palette.primary.main },
  };

	return (
		<StyledCard>
			<ChartDropdown />
			<Bar {...config} />;
		</StyledCard>
	)
}

export default BarChart