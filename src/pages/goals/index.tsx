import { ChangeEvent, useContext, useState } from "react"
import { Button, CircularProgress } from "@mui/material"
import ValidatedTextField from "src/components/ValidatedTextField"
import { CenteredText } from "src/components/shared-components"
import { StyledContainer, VerticalFieldsContainer } from "src/components/styled-components"
import { CenterContainer } from "../splash/splash-style"
import { amountValidator } from "src/utils/input-validators"
import { useChangeLimit } from "src/api/apis"
import { StateContext } from "src/app/app"

const Goals = () => {
	const {appState} = useContext(StateContext) || {};
	const {monthlyExpenseLimit} = appState || {};
	const [limit, setLimit] = useState<string | number>(monthlyExpenseLimit as string);
	const limitChangeAPI = useChangeLimit();
	const loading = limitChangeAPI.isPending;

	const setMonthlyLimit = (e: ChangeEvent<HTMLInputElement>) => {
		setLimit(e.target.value);
	};

	const saveSettings = () => {
		limitChangeAPI.mutate({limit: limit});
	};

	return (
		<StyledContainer>
			<CenteredText variant='h2' color="primary"> Goals </CenteredText>
			<CenterContainer>
				{loading && <CircularProgress color="primary" size={50} />}
				<VerticalFieldsContainer>
					<ValidatedTextField
						name="monthlyLimit"
						label="Monthly expense limit"
						value={limit}
						onChange={setMonthlyLimit}
						validator={amountValidator}
					/>
				</VerticalFieldsContainer>
				<VerticalFieldsContainer>
					<Button variant="contained" onClick={saveSettings} disabled={loading}>
						Save
					</Button>
				</VerticalFieldsContainer>
			</CenterContainer>
		</StyledContainer>
	)
}

export default Goals