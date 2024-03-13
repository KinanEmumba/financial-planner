import { useCallback, useContext, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

import { FullCenteredView, StyledPaper } from "src/components/styled-components"
import { StyledFab } from "src/pages/transactions/transactions-style";
import { CenteredLoader, CenteredText } from "src/components/shared-components";
import { StateContext } from "src/app/app";
import ExpensesTable from "src/pages/transactions/ExpensesTable";
import { SnackBarContext } from "src/app/snackbar-context";
import NewExpenseModal from "./NewExpenseModal";
import { useDeleteExpense, useGetExpenses } from "src/api/apis";
import { ExpenseDataType } from "src/utils/shared-types";

const Transactions = () => {
	const { appState } = useContext(StateContext) || {};
	const { user } = appState || {};
	const { data, isLoading, error } = useGetExpenses({id: user?.id || ''});
	const deleteExpenseAPI = useDeleteExpense();
	const {showSnackbar} = useContext(SnackBarContext);
	const [modalVisible, setModalVisible] = useState(false);
	const [editExpense, setEditExpense] = useState<null | {expense: ExpenseDataType, id: number}>(null);
	const loading = deleteExpenseAPI.isPending || isLoading;
	
	useEffect(()=> {
		if (error) {
			showSnackbar({
				message: `Error logging in ${error.message}`,
				type: "error"
			});
		}
	}, [error, showSnackbar])

	const addNewExpense = () => {
		setModalVisible(true);
	};
	
	const onExpenseCreation = useCallback(() => {
		setModalVisible(false);
		setEditExpense(null);
	},[])
	
	const onCancel = useCallback(() => {
		setModalVisible(false);
		setEditExpense(null);
	},[])
	
	const onEdit = ({index}: {index: number}) => {
		if (!data) return;
		setEditExpense({expense: data.expenses[index], id: index});
		addNewExpense();
	}
	
	const onDelete = ({index}: {index: number}) => {
		if (!data) return;
		deleteExpenseAPI.mutate({expense: data.expenses[index], id: index});
	}

	return (
		<>
			<StyledPaper>
				<CenteredText variant='h2'> Transactions </CenteredText>
				<FullCenteredView>
					<StyledFab color="secondary" onClick={addNewExpense}>
						<AddIcon />
					</StyledFab>
					{loading && <CenteredLoader />}
					{error && <CenteredText variant='h6'> Unable to get expenses </CenteredText>}
					{!loading && !data?.expenses?.length && (
						<CenteredText variant='h6'> Click + icon to start adding expenses </CenteredText>
					)}
				</FullCenteredView>
				{data?.expenses && (
					<ExpensesTable
						expenses={data.expenses}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				)}
			</StyledPaper>
			<NewExpenseModal
				visible={modalVisible}
				editExpense={editExpense}
				onSuccess={onExpenseCreation}
				onCancel={onCancel}
			/>
		</>
	)
}

export default Transactions