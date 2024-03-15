import { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import AppRoutes from 'src/app/routes'
import useAppUserContext from 'src/app/app-state-context'
import { theme } from 'src/app/theme'
import { AppStateType } from 'src/utils/shared-types'
import { queryClient } from 'src/api/react-query-setup'
import { SnackBarProvider } from 'src/app/snackbar-context'

export const StateContext = createContext<AppStateType>(null);

export function App() {

	const {appState} = useAppUserContext();

  return (
    <BrowserRouter>
      <StateContext.Provider value={{appState}}>
        <ThemeProvider theme={theme}>
					<QueryClientProvider client={queryClient}>
						<CssBaseline />
						<SnackBarProvider>
							<AppRoutes />
						</SnackBarProvider>
					</QueryClientProvider>
        </ThemeProvider>
      </StateContext.Provider>
    </BrowserRouter>
  );
}

export default App
