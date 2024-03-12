import { useContext, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

import { FullCenteredView, StyledPaper } from "src/components/styled-components"
import { StyledFab } from "src/pages/transactions/transactions-style";
import { CenteredLoader, CenteredText } from "src/components/shared-components";
import { AuthContext } from "src/app/app";
import { useGetExpenses } from "src/api/apis";
import ExpensesTable from "src/pages/transactions/ExpensesTable";
import { SnackBarContext } from "src/app/snackbar-context";
import NewExpenseModal from "./NewExpenseModal";

const Transactions = () => {
	const { user } = useContext(AuthContext) || {};
	const {showSnackbar} = useContext(SnackBarContext);
	const { data, isLoading, error } = useGetExpenses({id: user?.id || ''});
	const [modalVisible, setModalVisible] = useState(false);
	
	useEffect(()=> {
		if (error) {
			showSnackbar({
				message: `Error logging in ${error.message}`,
				type: "error"
			});
		}
	}, [error, showSnackbar])

	const addNewExpense = () => {
		console.log('adding new expense');
		setModalVisible(true);
		// handleOpen();
	};
	
	const onClose = () => {
		setModalVisible(false);
	}

	return (
		<>
			<StyledPaper>
				<CenteredText variant='h2'> Transactions </CenteredText>
				<FullCenteredView>
					<StyledFab color="secondary" onClick={addNewExpense}>
						<AddIcon />
					</StyledFab>
					{isLoading && <CenteredLoader />}
					{error && <CenteredText variant='h6'> Unable to get expenses </CenteredText>}
					{!isLoading && !data?.expenses.length && (
						<CenteredText variant='h6'> Click + icon to start adding expenses </CenteredText>
					)}
				</FullCenteredView>
				{data && <ExpensesTable expenses={data?.expenses} />}
			</StyledPaper>
			<NewExpenseModal visible={modalVisible} onClose={onClose}/>
		</>
	)
}

export default Transactions