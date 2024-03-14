import { useMemo, useState } from 'react';
import { Column } from '@ant-design/charts'
import { theme } from 'src/app/theme';
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import ChartDropdown from './ChartDropdown';
import { colConfigMaker, createColData } from 'src/utils/helper-functions';
import { ExpenseDataType, TimePeriod } from 'src/utils/shared-types';
import { SelectChangeEvent } from '@mui/material';

const ColumnChart = ({expenses}: {expenses: ExpenseDataType[]}) => {

	const [selectedOption, setSelectedOption] = useState(TimePeriod.year as string);

  const colData = useMemo(() => createColData(expenses, selectedOption as TimePeriod), [expenses, selectedOption]);
  const colConfig = useMemo(() => colConfigMaker(colData, theme.palette.primary.main), [colData]);

	const onChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return (
    <StyledCard>
      <ChartDropdown onChange={onChange} value={selectedOption} />
      <Column {...colConfig} />
    </StyledCard>
  );
}

export default ColumnChart