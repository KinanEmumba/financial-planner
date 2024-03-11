import { useState } from 'react'
import { TokenResponseType, TokenType, UserType } from 'src/utils/shared-types';

const useAppUserContext = () => {
  const storedToken = sessionStorage.getItem('userToken');
  const [userToken, setUserToken] = useState<TokenType>(storedToken || undefined);
  const [user, setUser] = useState<UserType | null>(null);

  const gotoHome = () => {
    window.location.replace('/')
  };

  const signout = () => {
    sessionStorage.removeItem('userToken');
    setUserToken(undefined);
    gotoHome();
  };

	const saveToken = ({userTokenResponse}: {userTokenResponse: TokenResponseType}) => {
		setUserToken(userTokenResponse.userToken);
		sessionStorage.setItem('userToken', userTokenResponse.userToken as string);
	}
	
	const saveUser = ({user}: {user: UserType}) => {
		setUser(user);
	}

  return {userToken, saveToken, user, saveUser, signout};
}

export default useAppUserContext