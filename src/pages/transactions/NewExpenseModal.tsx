import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Modal, Switch } from '@mui/material';
import ValidatedTextField from 'src/components/ValidatedTextField';
import { StyledModalBox } from 'src/pages/transactions/transactions-style';
import { amountValidator } from 'src/utils/input-validators';
import { VerticalFieldsContainer } from 'src/components/styled-components';
import { useEditExpense, usePostExpense } from 'src/api/apis';
import { ExpenseDataType } from 'src/utils/shared-types';
import { CenteredLoader } from 'src/components/shared-components';
import { SnackBarContext } from 'src/app/snackbar-context';

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

	const [expenseValues, setExpenseValues] = useState<ExpenseDataType>({
		type: 'debit',
		amount: '',
		category: '',
		description: '',
		date: new Date().toISOString(),
	});

	useEffect(() => {
		if (editExpense) {
			setExpenseValues(editExpense.expense || {
				type: 'debit',
				amount: '',
				category: '',
				description: '',
				date: new Date().toISOString(),
			});
		}
	}, [editExpense])

	useEffect(() => {
		if (success) {
			console.log('got data', data);
			showSnackbar({
				message: `Expense ${editExpense ? 'Created' : 'Edited'}`,
				type: "success"
			});
			onSuccess && onSuccess();
		}
	}, [editExpense, onSuccess, success, showSnackbar, data]);

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
      [e.target.name]: e.target.name !== 'type' ? e.target.value : e.target.checked? 'credit' : 'debit' ,
    });
	};

	return (
		<Modal open={visible} onClose={onCancel}>
			<StyledModalBox component="form" onSubmit={handleSubmit}>
			{isPending && <CenteredLoader />}
				<VerticalFieldsContainer>
					<div>
						{expenseValues.type.replace(/^./, expenseValues.type[0].toUpperCase())}
						<Switch
							name='type' 
							onChange={handleExpenseInput}
							disabled={isPending}
							checked={expenseValues.type === 'credit'}
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