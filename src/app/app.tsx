import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from 'src/app/routes';
import { theme } from 'src/app/theme';

export const AuthContext = createContext(null);
const queryClient = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <AuthContext.Provider value={null}>
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
