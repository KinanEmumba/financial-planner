import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { StyledContainer } from "src/components/styled-components";
import { CenterContainer, SingleRowContainer, StyledTextField, StyledTitle } from "src/pages/splash/splash-style";
import { useGetToken, useGetUser } from "src/api/apis";
import { UserLoginType } from "src/helpers/shared-types";
import { AuthContext } from "src/app/app";

const Splash = () => {
	const navigate = useNavigate();
	const contextValue = useContext(AuthContext);
	const userToken = contextValue?.userToken;
	const [loginInfo, setLoginInfo] = useState<UserLoginType>({username: '', password: ''});
	const getUserTokenMutation = useGetToken({loginInfo});
	const getUserQuery = useGetUser({userToken});
	const localLoading = getUserTokenMutation.isPending || getUserQuery.isLoading;

	useEffect(() => {
		if (getUserQuery.data) {
			contextValue?.saveUser({user: getUserQuery.data});
			navigate('/dashboard');
		}
	},[contextValue, getUserQuery.data, navigate])

	useEffect(() => {
		if (getUserTokenMutation.data) {
			contextValue?.saveToken({userTokenResponse: getUserTokenMutation.data});
		}
	},[contextValue, getUserTokenMutation.data])
	
	const login = async () => {
		getUserTokenMutation.mutate();
	}

	const setLogin = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginInfo(prev => ({
			...prev,
			[e.target?.name]: e.target?.value
		}));
	}

  return (
    <StyledContainer>
			<CenterContainer>
				<StyledTitle>
					Financial Planner
				</StyledTitle>
				{!userToken &&
					<SingleRowContainer>
					<StyledTextField label="User name" name="username" onChange={setLogin} />
					<StyledTextField label="Password" name="password" type="password" onChange={setLogin} />
				</SingleRowContainer>}
				{!userToken && <SingleRowContainer>
					<Button variant="contained" onClick={login}>Login</Button>
				</SingleRowContainer>}
				{localLoading && 
				<SingleRowContainer>
					<CircularProgress color="primary" size={75} />
				</SingleRowContainer>}
			</CenterContainer>
    </StyledContainer>
  )
}

export default Splash