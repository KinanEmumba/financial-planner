import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import AppRoutes from 'src/app/routes';
import { theme } from 'src/app/theme';
import useAppUserContext from 'src/app/app-user-context';
import { AppUserContextType } from 'src/utils/shared-types';
import { queryClient } from 'src/api/react-query-setup';

export const AuthContext = createContext<AppUserContextType>(null);

export function App() {
	const {userToken, saveToken, user, saveUser, gotoHome, signout} = useAppUserContext();
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{userToken, saveToken, user, saveUser, gotoHome, signout}}>
        <ThemeProvider theme={theme}>
					<QueryClientProvider client={queryClient}>
						<SnackbarProvider>
          		<AppRoutes />
						</SnackbarProvider>
					</QueryClientProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
