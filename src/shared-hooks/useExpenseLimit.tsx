import { useEffect, useState } from 'react'
import { useGetLimit } from 'src/api/apis';

const useExpenseLimit = () => {
	const [expenseLimit, setExpenseLimit] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	
	const { data, isLoading: expenseLimitLoading, error: expenseLimitError } = useGetLimit();

	useEffect(() => {
		if (data) setExpenseLimit(parseFloat(data.limit || '0'))
	}, [data]);
	
	useEffect(() => {
		if (expenseLimitError) setError(expenseLimitError)
	}, [expenseLimitError])
	
	useEffect(() => {
		setIsLoading(expenseLimitLoading)
	}, [expenseLimitLoading])
	
	return {
		expenseLimit, error, isLoading
	}
}

export default useExpenseLimit