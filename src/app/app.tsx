import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import AppRoutes from 'src/app/routes';
import { theme } from 'src/app/theme';
import useAppUserContext from 'src/app/app-user-context';
import { AppUserContextType } from 'src/utils/shared-types';
import { queryClient } from 'src/api/react-query-setup';
import { SnackBarProvider } from 'src/app/snackbar-context';

export const AuthContext = createContext<AppUserContextType>(null);
export function App() {

	const {userToken, saveToken, user, saveUser, signout} = useAppUserContext();
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{userToken, saveToken, user, saveUser, signout}}>
        <ThemeProvider theme={theme}>
					<QueryClientProvider client={queryClient}>
						<CssBaseline />
						<SnackBarProvider>
							<AppRoutes />
						</SnackBarProvider>
					</QueryClientProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
