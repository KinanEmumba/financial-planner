

import { ThemeProvider } from '@mui/material/styles';
import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from 'src/app/routes';
import { theme } from 'src/app/theme';

export const AuthContext = createContext(null);

export function App() {
  return (
    <BrowserRouter>
      <AuthContext.Provider value={null}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
