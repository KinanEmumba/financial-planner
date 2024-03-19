import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "@mui/material"

import { FullScreenLoader, CenterAlignedText } from "src/components/shared-components"
import { StyledBGContainer, CenteredFlexContainer, RowWrappingContainer } from "src/components/styled-components"
import { amountValidator } from "src/utils/input-validators"
import { useChangeLimit, useSetCategories } from "src/api/apis"
import { CategoryDataType } from "src/utils/shared-types"
import useCategories from 'src/shared-hooks/useCategories'
import useExpenseLimit from 'src/shared-hooks/useExpenseLimit'
import InputWithLabel from "src/pages/goals/InputWithLabel"
import { FloatingButtonContainer } from "./goals-style"

const Goals = () => {
	const [limit, setLimit] = useState<string | number>('');
	const [cats, setCats] = useState<CategoryDataType[]>([]);
	const { expenseLimit, expensesLimitLoading } = useExpenseLimit();
	const {categories, isLoading: catsLoading} = useCategories();
	const limitChangeAPI = useChangeLimit();
	const categoryChangeAPI = useSetCategories();
	const loading = expensesLimitLoading || catsLoading || limitChangeAPI.isPending || categoryChangeAPI.isPending;
	
	useEffect(() => {
		categories && setCats(categories);
		expenseLimit && setLimit(expenseLimit);
	}, [categories, expenseLimit]);

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
		<StyledBGContainer>
			{loading && <FullScreenLoader />}
			<CenterAlignedText variant='h2' color="primary"> Goals </CenterAlignedText>
			<CenteredFlexContainer>
				<InputWithLabel
					title="Total Monthly Expense Limit"
					name="monthlyLimit"
					label="Monthly expense limit"
					value={limit}
					onChange={setMonthlyLimit}
					validator={amountValidator}
				/>
				<CenterAlignedText variant='h4' color="primary"> Individual category limits </CenterAlignedText>
				<RowWrappingContainer>
					{cats.map(cat => (
						<InputWithLabel
							key={cat.title}
							title={cat.title}
							name={cat.title}
							label={`${cat.title} expense limit`}
							value={cat.limit}
							onChange={onCatChange}
							validator={amountValidator}
						/>
					))}
				</RowWrappingContainer>
				<FloatingButtonContainer>
					<Button variant="contained" onClick={saveSettings} disabled={loading}>
						Save Settings
					</Button>
				</FloatingButtonContainer>
			</CenteredFlexContainer>
		</StyledBGContainer>
	)
}

export default Goals