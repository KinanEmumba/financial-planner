import { ChangeEvent, useState } from 'react'
import { StyledTextField } from './styled-components';

const ValidatedTextField = ({
	label,
	validator,
	onChange
}: {
	label: string,
	validator: (value: string) => boolean | string,
	onChange: (isValid: boolean) => boolean;

}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const errorMessage = validator(newValue);
    setValue(newValue);
    setError(errorMessage);
    onChange(!errorMessage);
  };
	
  return (
    <StyledTextField
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
    />
  );
};

export default ValidatedTextField