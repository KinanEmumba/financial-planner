import { useMemo, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { Column } from '@ant-design/charts'

import { theme } from 'src/app/theme'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import { colConfigMaker, createColData } from 'src/utils/helper-functions'
import { TimePeriod } from 'src/utils/shared-types'
import ChartDropdown from 'src/components/ChartDropdown'
import useExpenses from 'src/shared-hooks/useExpenses'

const ColumnChart = () => {
	const { expenses } = useExpenses();
	const [timePeriod, setTimePeriod] = useState(TimePeriod.year as string);

  const colData = useMemo(
		() => createColData(expenses, timePeriod as TimePeriod),
	[expenses, timePeriod]);
  const colConfig = useMemo(() => colConfigMaker(colData, theme.palette.primary.main), [colData]);

	const onChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };

  return (
    <StyledCard>
      <ChartDropdown onChange={onChange} value={timePeriod} />
      <Column {...colConfig} />
    </StyledCard>
  );
}

export default ColumnChart