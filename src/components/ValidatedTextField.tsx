import { ChangeEvent, useState } from 'react'
import { StyledTextField } from './styled-components';

const ValidatedTextField = ({
	label,
	name,
	validator,
	onChange,
	type
}: {
	label: string,
	name: string,
	validator?: (value: string) => boolean | string,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: React.HTMLInputTypeAttribute | undefined

}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const errorMessage = validator ? validator(newValue) : '';
    setValue(newValue);
    setError(errorMessage);
    onChange(e);
  };
	
  return (
    <StyledTextField
			name={name}
			type={type}
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
    />
  );
};

export default ValidatedTextField