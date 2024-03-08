import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onSuccess: (data: unknown) => {
			// enqueueSnackbar('Successful!', { variant: 'success' });
		},
		onError: (error: Error) => {
			enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
		},
	}),
	mutationCache: new MutationCache({
		onSuccess: (data: unknown) => {
			enqueueSnackbar('Successful!', { variant: 'success' });
		},
		onError: (error: Error) => {
			enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
		},
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
		},
	}
});
