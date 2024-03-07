import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';

import AppRoutes from 'src/app/routes';
import { theme } from 'src/app/theme';
import useAppUserContext from 'src/app/app-user-context';
import { AppUserContextType } from 'src/helpers/shared-types';

export const AuthContext = createContext<AppUserContextType>(null);

export function App() {
	const {userToken, saveToken, user, saveUser, gotoHome, signout} = useAppUserContext();
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{userToken, saveToken, user, saveUser, gotoHome, signout}}>
        <ThemeProvider theme={theme}>
					<QueryClientProvider client={queryClient}>
          	<AppRoutes />
					</QueryClientProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
