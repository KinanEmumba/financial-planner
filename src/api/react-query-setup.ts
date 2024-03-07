import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

const cacheResponses = {
	onSuccess: (data: unknown) => {
		enqueueSnackbar('Successful!', { variant: 'success' });
	},
	onError: (error: Error) => {
		enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
	},
};

export const queryClient = new QueryClient({
	queryCache: new QueryCache(cacheResponses),
	mutationCache: new MutationCache(cacheResponses),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
		},
	}
});
