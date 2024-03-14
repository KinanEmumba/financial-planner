import { useEffect, useState } from 'react'

import { useGetCategories } from 'src/api/apis';
import { CategoryDataType } from 'src/utils/shared-types';

const useCategories = () => {
	const [categories, setCategories] = useState<CategoryDataType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	
	const {
		data,
		isLoading: catsLoading,
		error: catsError
	} = useGetCategories();

	useEffect(() => {
		if (data) setCategories(data?.categories)
	}, [data])
	
	useEffect(() => {
		if (catsError) setError(catsError)
	}, [catsError])
	
	useEffect(() => {
		setIsLoading(catsLoading)
	}, [catsLoading])

	return {
		categories, error, isLoading
	}
}

export default useCategories