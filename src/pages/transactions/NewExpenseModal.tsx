import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Modal, Switch } from '@mui/material';
import ValidatedTextField from 'src/components/ValidatedTextField';
import { StyledModalBox } from 'src/pages/transactions/transactions-style';
import { amountValidator } from 'src/utils/input-validators';
import { VerticalFieldsContainer } from 'src/components/styled-components';
import { usePostExpense } from 'src/api/apis';
import { ExpenseDataType } from 'src/utils/shared-types';

const NewExpenseModal = ({
	visible,
	onClose
}: {
	visible: boolean,
	onClose: () => void,
}) => {
	const [expenseValues, setExpenseValues] = useState<ExpenseDataType>({
		type: 'debit',
		amount: '',
		category: '',
		description: '',
		date: '',
	});
	const postExpense = usePostExpense({expense: expenseValues});

	const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', expenseValues);
		postExpense.mutate();
    onClose();
  };

	const handleExpenseInput = (e: ChangeEvent<HTMLInputElement>) => {
    setExpenseValues({
      ...expenseValues,
      [e.target.name]: e.target.name !== 'type' ? e.target.value : e.target.checked? 'credit' : 'debit' ,
    });
	};

	return (
		<Modal open={visible} onClose={onClose}>
			<StyledModalBox component="form" onSubmit={handleSubmit}>
				<VerticalFieldsContainer>
					<div>
						{expenseValues.type.replace(/^./, expenseValues.type[0].toUpperCase())}
						<Switch name='type' onChange={handleExpenseInput} value={expenseValues.type === 'credit'} />
					</div>
					<ValidatedTextField
						name="amount"
						label="Amount"
						validator={amountValidator}
						onChange={handleExpenseInput}
					/>
					<ValidatedTextField
						name="category"
						label="Category"
						onChange={handleExpenseInput}
					/>
					<ValidatedTextField
						name="description"
						label="Description"
						onChange={handleExpenseInput}
					/>
				</VerticalFieldsContainer>
				<VerticalFieldsContainer>
					<Button type="submit" variant="contained">Add Expense</Button>
				</VerticalFieldsContainer>
			</StyledModalBox>
		</Modal>
	);
}

export default NewExpenseModal