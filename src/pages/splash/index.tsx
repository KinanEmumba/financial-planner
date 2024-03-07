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
	const tokenAPI = useGetToken({loginInfo});
	const userAPI = useGetUser({userToken});
	const localLoading = tokenAPI.isPending || userAPI.isLoading;

	useEffect(() => {
		if (userAPI.data) {
			contextValue?.saveUser({user: userAPI.data});
			navigate('/dashboard');
		}
	},[contextValue, userAPI.data, navigate])

	useEffect(() => {
		if (tokenAPI.data) {
			contextValue?.saveToken({userTokenResponse: tokenAPI.data});
		}
	},[contextValue, tokenAPI.data])
	
	const login = async () => {
		tokenAPI.mutate();
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
				<SingleRowContainer>
					<StyledTextField
						label="User name"
						name="username"
						onChange={setLogin}
						disabled={userAPI.isLoading}
					/>
					<StyledTextField
						label="Password"
						name="password"
						type="password"
						onChange={setLogin}
						disabled={userAPI.isLoading}
					/>
				</SingleRowContainer>
				<SingleRowContainer>
					{!localLoading && <Button variant="contained" onClick={login}>Login</Button>}
				</SingleRowContainer>
				<SingleRowContainer>
					{localLoading && <CircularProgress color="primary" size={75} />}
				</SingleRowContainer>
			</CenterContainer>
    </StyledContainer>
  )
}

export default Splash