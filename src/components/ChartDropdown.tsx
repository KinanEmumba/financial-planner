import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

import { TimePeriod } from 'src/utils/shared-types';

const ChartDropdown = ({
	value,
	onChange,
}: {
	value?: string,
	onChange: (e: SelectChangeEvent) => void,
}) => {
	return (
		<Select
      value={value}
      onChange={onChange}
      displayEmpty
      fullWidth
    >
      <MenuItem value="" disabled>Select Time Period</MenuItem>
      <MenuItem value={TimePeriod.year}>This Year</MenuItem>
      <MenuItem value={TimePeriod.month}>This Month</MenuItem>
    </Select>
	)
}

export default ChartDropdown