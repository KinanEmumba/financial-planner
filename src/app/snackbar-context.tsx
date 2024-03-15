import { createContext, ReactNode } from "react"
import { SnackbarOptions } from "src/utils/shared-types"
import useSnackbar from "src/shared-hooks/useSnackbar"

const showSnackbar = (options: SnackbarOptions) => null;
export const SnackBarContext = createContext<{showSnackbar: (options: SnackbarOptions) => void}>({showSnackbar});

export function SnackBarProvider({ children }: {children: ReactNode}) {
  
	const {SnackbarView, showSnackbar} = useSnackbar();
  
  return (
    <SnackBarContext.Provider value={{showSnackbar}}>
      {children}
      <SnackbarView />
    </SnackBarContext.Provider>
  )
}