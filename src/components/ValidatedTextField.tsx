import { ChangeEvent, useState } from 'react'

import { StyledTextField } from './styled-components';

const ValidatedTextField = ({
	label,
	name,
	validator,
	onChange,
	type,
	disabled,
	value,
}: {
	label: string,
	name: string,
	disabled?: boolean,
	value?: string | number,
	validator?: (value: string) => boolean | string,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: React.HTMLInputTypeAttribute | undefined

}) => {
  const [localValue, setLocalValue] = useState("");
  const [error, setError] = useState<string | boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const errorMessage = validator ? validator(newValue) : '';
    setLocalValue(newValue);
    setError(errorMessage);
    onChange(e);
  };
	
  return (
    <StyledTextField
			name={name}
			type={type}
      label={label}
      value={value || localValue}
      onChange={handleChange}
      error={!!error}
      helperText={error}
			disabled={disabled}
    />
  );
};

export default ValidatedTextField