import { ChangeEvent } from 'react'

import ValidatedTextField from 'src/components/ValidatedTextField'
import { CenterAlignedText } from 'src/components/shared-components'
import { InLineContainer, VerticalFieldsContainer } from 'src/components/styled-components'
import { CategoryExpenseRow } from 'src/pages/goals/goals-style'

const InputWithLabel = ({
	title,
	name,
	label,
	value,
	onChange,
	validator,
}:{
	title: string,
	name: string,
	label: string,
	value: string | number,
	validator: (value: string) => boolean | string,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}) => {
	return (
		<VerticalFieldsContainer>
			<CategoryExpenseRow>
				<InLineContainer>
					<CenterAlignedText variant='h6' color="primary"> {title} </CenterAlignedText>
				</InLineContainer>
				<ValidatedTextField
					name={name}
					label={label}
					value={value}
					onChange={onChange}
					validator={validator}
				/>
			</CategoryExpenseRow>
		</VerticalFieldsContainer>
	)
}

export default InputWithLabel