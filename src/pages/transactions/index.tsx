import { useContext } from "react";
import AddIcon from '@mui/icons-material/Add';

import { StyledPaper } from "src/components/styled-components"
import { StyledFab } from "src/pages/transactions/transactions-style";
import { CenteredLoader, CenteredText } from "src/components/shared-components";
import { AuthContext } from "src/app/app";
import { useGetExpenses } from "src/api/apis";
import ExpensesTable from "src/pages/transactions/ExpensesTable";

const Transactions = () => {
	const { user } = useContext(AuthContext) || {};
	const {data, isLoading} = useGetExpenses({id: user?.id || ''});
	console.log('got expenses data', data);

	const addNewExpense = () => {
		console.log('adding new expense');
	};

	return (
		<StyledPaper>
			<CenteredText variant='h2'> Transactions </CenteredText>
			<StyledFab color="secondary" onClick={addNewExpense}>
        <AddIcon />
      </StyledFab>
			{isLoading && <CenteredLoader />}
			{data && <ExpensesTable expenses={data.expenses}/>}
		</StyledPaper>
	)
}

export default Transactions