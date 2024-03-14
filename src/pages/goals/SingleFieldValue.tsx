import { ChangeEvent } from 'react'

import ValidatedTextField from 'src/components/ValidatedTextField'
import { CenteredText } from 'src/components/shared-components'
import { VerticalFieldsContainer } from 'src/components/styled-components'
import { CategoryExpenseRow } from 'src/pages/goals/goals-style'

const SingleFieldValue = ({
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
				<CenteredText variant='h6' color="primary"> {title} </CenteredText>
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

export default SingleFieldValue