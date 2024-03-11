import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onSuccess: (data: unknown) => {
			// enqueueSnackbar('Successful!', { variant: 'success' });
		},
		onError: (error: Error) => {
			// enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
		},
	}),
	mutationCache: new MutationCache({
		onSuccess: (data: unknown) => {
			// enqueueSnackbar('Successful!', { variant: 'success' });
		},
		onError: (error: Error) => {
			// enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
		},
	}),
	// defaultOptions: {
	// 	queries: {
	// 		refetchOnWindowFocus: true,
	// 		retry: 0,
	// 	},
	// }
});
