import { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';


const ChartDropdown = () => {
	const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

	return (
		<Select
      value={selectedOption}
      onChange={handleChange}
      displayEmpty
      fullWidth
    >
      <MenuItem value="" disabled>Select Time Period</MenuItem>
      <MenuItem value="thisYear">This Year</MenuItem>
      <MenuItem value="thisMonth">This Month</MenuItem>
    </Select>
	)
}

export default ChartDropdown