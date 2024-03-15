import { ChangeEvent, useEffect, useState } from "react"
import { Button, CircularProgress } from "@mui/material"

import { CenteredText } from "src/components/shared-components"
import { StyledContainer, VerticalFieldsContainer, CenterContainer, Spacer } from "src/components/styled-components"
import { amountValidator } from "src/utils/input-validators"
import { useChangeLimit, useSetCategories } from "src/api/apis"
import { CategoryDataType } from "src/utils/shared-types"
import useCategories from 'src/shared-hooks/useCategories';
import useExpenseLimit from 'src/shared-hooks/useExpenseLimit';
import SingleFieldValue from "src/pages/goals/SingleFieldValue"

const Goals = () => {
	const [limit, setLimit] = useState<string | number>('');
	const [cats, setCats] = useState<CategoryDataType[]>([]);
	const { expenseLimit, isLoading } = useExpenseLimit();
	const {categories, isLoading: catsLoading} = useCategories();
	const limitChangeAPI = useChangeLimit();
	const categoryChangeAPI = useSetCategories();
	const loading = isLoading || catsLoading || limitChangeAPI.isPending || categoryChangeAPI.isPending;

	useEffect(() => {
		if (categories) {
			setCats(categories);
		}
	}, [categories]);
	
	useEffect(() => {
		if (expenseLimit) {
			setLimit(expenseLimit);
		}
	}, [expenseLimit]);

	const setMonthlyLimit = (e: ChangeEvent<HTMLInputElement>) => {
		setLimit(e.target.value);
	};

	const saveSettings = () => {
		limitChangeAPI.mutate({limit: limit});
		categoryChangeAPI.mutate({categories: cats})
	};

	const onCatChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newCat = {title: e.target.name, limit: parseFloat(e.target.value)};
		setCats(prev => [...prev.map(cat => cat.title === e.target.name ? newCat : cat)]);
	};

	return (
		<StyledContainer>
			<CenteredText variant='h2' color="primary"> Goals </CenteredText>
			<CenterContainer>
				{loading && <CircularProgress color="primary" size={50} />}
				<SingleFieldValue
					title="Total Monthly Expense Limit"
					name="monthlyLimit"
					label="Monthly expense limit"
					value={limit}
					onChange={setMonthlyLimit}
					validator={amountValidator}
				/>
				<Spacer margin='20px 0'/>
				<CenteredText variant='h4' color="primary"> Individual category limits </CenteredText>
				<Spacer margin='20px 0'/>
				{cats.map(cat => (
					<SingleFieldValue
						key={cat.title}
						title={cat.title}
						name={cat.title}
						label={`${cat.title} expense limit`}
						value={cat.limit}
						onChange={onCatChange}
						validator={amountValidator}
					/>
				))}
				<VerticalFieldsContainer>
					<Button variant="contained" onClick={saveSettings} disabled={loading}>
						Save Settings
					</Button>
				</VerticalFieldsContainer>
			</CenterContainer>
		</StyledContainer>
	)
}

export default Goals