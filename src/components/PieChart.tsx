import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { Pie } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import { createPieData, pieConfigMaker } from 'src/utils/helper-functions';
import {  TimePeriod } from 'src/utils/shared-types';
import ChartDropdown from './ChartDropdown';
import useExpenses from 'src/shared-hooks/useExpenses';

const PieChart = () => {
	const { expenses } = useExpenses();
	const [timePeriod, setTimePeriod] = useState(TimePeriod.year);
	
	const pieData = createPieData(expenses, timePeriod);
	const pieConfig = pieConfigMaker(pieData);
	console.log('pieData', pieData);

	const onChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value as TimePeriod);
  };

	return (
		<StyledCard>
			<ChartDropdown onChange={onChange} value={timePeriod} />
			<Pie {...pieConfig} />
		</StyledCard>
	)
}

export default PieChart