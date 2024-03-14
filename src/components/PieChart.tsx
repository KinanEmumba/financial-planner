import { Pie } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import { createPieData, pieConfigMaker } from 'src/utils/helper-functions';
import { ExpenseDataType } from 'src/utils/shared-types';

const PieChart = ({
	expenses,
	currentMonth
}:{
	expenses: ExpenseDataType[],
	currentMonth: number
}) => {
	
	const pieData = createPieData(expenses, currentMonth);
	const pieConfig = pieConfigMaker(pieData);

	return (
		<StyledCard>
			<Pie {...pieConfig} />
		</StyledCard>
	)
}

export default PieChart