import { useMemo } from 'react';
import { Column } from '@ant-design/charts'
import { theme } from 'src/app/theme';
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import ChartDropdown from './ChartDropdown';
import { colConfigMaker, createColData } from 'src/utils/helper-functions';
import { ExpenseDataType } from 'src/utils/shared-types';

const ColumnChart = ({expenses}: {expenses: ExpenseDataType[]}) => {

  const colData = useMemo(() => createColData(expenses), [expenses]);
  const colConfig = useMemo(() => colConfigMaker(colData, theme.palette.primary.main), [colData]);

  return (
    <StyledCard>
      <ChartDropdown />
      <Column {...colConfig} />
    </StyledCard>
  );
}

export default ColumnChart