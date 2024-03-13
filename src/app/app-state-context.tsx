import { useEffect, useState } from 'react'
import { ExpenseDataType, TokenResponseType, TokenType, UserType } from 'src/utils/shared-types';

const useStateContext = () => {
  const storedToken = localStorage.getItem('userToken');
  const [userToken, setUserToken] = useState<TokenType>(storedToken || undefined);
  const [user, setUser] = useState<UserType | null>(null);
  const [expenses, setExpenses] = useState<ExpenseDataType[]>([]);
  const [limit, setLimit] = useState<string | null>(null);

	useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStorageChange = (e: any) => {
			console.log('Storage changed', e.detail);
			if (e.detail.includes('expense')) {
				const storedExpenses = localStorage.getItem('expenses');
				const localExpensesData: ExpenseDataType[] = storedExpenses && JSON.parse(storedExpenses);
				setExpenses(localExpensesData);
			} else if (e.detail.includes('limit')) {
				const storedLimit = localStorage.getItem('limit');
				setLimit(storedLimit);
			}
    }
    window.addEventListener('storage', onStorageChange);
    return () => {
      window.removeEventListener('storage', onStorageChange);
    }
  }, []);

  const gotoHome = () => {
    window.location.replace('/')
  }

  const signout = () => {
    localStorage.removeItem('userToken');
    setUserToken(undefined);
    gotoHome();
  }

	const saveToken = ({userTokenResponse}: {userTokenResponse: TokenResponseType}) => {
		setUserToken(userTokenResponse.userToken);
		localStorage.setItem('userToken', userTokenResponse.userToken as string);
	}
	
	const saveUser = ({user}: {user: UserType}) => {
		setUser(user);
	}

	const appState = {
		userToken,
		saveToken,
		user,
		saveUser,
		signout,
		expenses,
		setExpenses,
		monthlyExpenseLimit: limit
	};

  return {appState};
}

export default useStateContext