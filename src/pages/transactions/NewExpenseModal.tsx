import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Modal, Switch } from '@mui/material'

import ValidatedTextField from 'src/components/ValidatedTextField'
import { StyledModalBox } from 'src/pages/transactions/transactions-style'
import { amountValidator } from 'src/utils/input-validators'
import { VerticalFieldsContainer } from 'src/components/styled-components'
import { useEditExpense, usePostExpense } from 'src/api/apis'
import { ExpenseDataType, ExpenseType } from 'src/utils/shared-types'
import { FullScreenLoader } from 'src/components/shared-components'
import { SnackBarContext } from 'src/app/snackbar-context'

const NewExpenseModal = ({
	visible,
	onSuccess,
	onCancel,
	editExpense
}: {
	visible: boolean,
	onSuccess?: () => void,
	onCancel?: () => void,
	editExpense: null | {expense: ExpenseDataType, id: number},
}) => {
	const {showSnackbar} = useContext(SnackBarContext);
	const postExpenseAPI = usePostExpense();
	const editExpenseAPI = useEditExpense();
	const isPending = postExpenseAPI.isPending || editExpenseAPI.isPending;
	const success = postExpenseAPI.isSuccess || editExpenseAPI.isSuccess;
	const data = postExpenseAPI.data || editExpenseAPI.data;

	const [initialState] = useState<ExpenseDataType>({
		type: ExpenseType.debit,
		amount: '',
		category: '',
		description: '',
		date: new Date().toISOString(),
	});
	const [expenseValues, setExpenseValues] = useState<ExpenseDataType>(initialState);

	useEffect(() => {
		if (editExpense) {
			setExpenseValues(editExpense.expense || initialState);
		}
	}, [editExpense, initialState])

	useEffect(() => {
		if (success) {
			showSnackbar({
				message: `Expense ${editExpense ? 'Edited' : 'Created'}`,
				type: "success"
			});
			setExpenseValues(initialState);
			onSuccess && onSuccess();
		}
	}, [editExpense, onSuccess, success, showSnackbar, data, initialState]);

	useEffect(() => {
		if (postExpenseAPI.error) {
			showSnackbar({
				message: `Error logging in ${postExpenseAPI.error.message}`,
				type: "error"
			});
		}
	}, [postExpenseAPI.error, showSnackbar]);

	const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', expenseValues);
		if (editExpense) {
			editExpenseAPI.mutate({expense: expenseValues, id: editExpense.id});
		} else {
			postExpenseAPI.mutate({expense: expenseValues});
		}
  };

	const handleExpenseInput = (e: ChangeEvent<HTMLInputElement>) => {
    setExpenseValues({
      ...expenseValues,
      [e.target.name]: e.target.name !== 'type' ?
				e.target.value :
				e.target.checked ?
					ExpenseType.credit :
					ExpenseType.debit,
    });
	};

	return (
		<Modal open={visible} onClose={onCancel}>
			<StyledModalBox component="form" onSubmit={handleSubmit}>
			{isPending && <FullScreenLoader />}
				<VerticalFieldsContainer>
					<div>
						{expenseValues.type === ExpenseType.debit ? 'Debit' : 'Credit'}
						<Switch
							name='type' 
							onChange={handleExpenseInput}
							disabled={isPending}
							checked={expenseValues.type === ExpenseType.credit}
						/>
					</div>
					<ValidatedTextField
						name="amount"
						label="Amount"
						validator={amountValidator}
						onChange={handleExpenseInput}
						value={expenseValues.amount}
						disabled={isPending}
					/>
					<ValidatedTextField
						name="category"
						label="Category"
						value={expenseValues.category}
						onChange={handleExpenseInput}
						disabled={isPending}
					/>
					<ValidatedTextField
						name="description"
						label="Description"
						value={expenseValues.description}
						onChange={handleExpenseInput}
						disabled={isPending}
					/>
				</VerticalFieldsContainer>
				<VerticalFieldsContainer>
					<Button type="submit" variant="contained" disabled={isPending}>
						Add Expense
					</Button>
				</VerticalFieldsContainer>
			</StyledModalBox>
		</Modal>
	);
}

export default NewExpenseModal