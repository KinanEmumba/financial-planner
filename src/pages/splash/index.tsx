import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";

import { StyledContainer } from "src/components/styled-components";
import { CenterContainer, SplashFieldsContainer, StyledTitle } from "src/pages/splash/splash-style";
import { useGetToken, useGetUser } from "src/api/apis";
import { AuthContext } from "src/app/app";
import ValidatedTextField from "src/components/ValidatedTextField";
import { emailValidator, passwordValidator } from "src/utils/input-validators";
import { UserLoginType } from "src/utils/shared-types";
import { SnackBarContext } from "src/app/snackbar-context";

const Splash = () => {
	const navigate = useNavigate();
	const contextValue = useContext(AuthContext);
	const {showSnackbar} = useContext(SnackBarContext);
	const userToken = contextValue?.userToken;
	const [loginInfo, setLoginInfo] = useState<UserLoginType>({ username: '', password: '' });
	const tokenAPI = useGetToken({loginInfo});
	const userAPI = useGetUser({userToken});
	const localLoading = tokenAPI.isPending || userAPI.isLoading;
	
	useEffect(() => {
		if (userAPI.isSuccess && userAPI.data) {
			showSnackbar({message: 'Successful Login', type: "success"});
			contextValue?.saveUser({user: userAPI.data});
			navigate('/home');
		}
	},[contextValue, userAPI.data, navigate, userAPI.isSuccess, showSnackbar])

	useEffect(() => {
		if (tokenAPI.data) {
			console.log('tokenAPI.data');
			contextValue?.saveToken({userTokenResponse: tokenAPI.data});
		}
	},[contextValue, tokenAPI.data])
	
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		tokenAPI.mutate();
  };
	
	const setLoginData = (e: ChangeEvent<HTMLInputElement>) => {
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
					<Box component="form" onSubmit={handleSubmit} noValidate>
						<SplashFieldsContainer>
							<ValidatedTextField
								name="username"
								label="Email"
								validator={emailValidator}
								onChange={setLoginData}
							/>
							<ValidatedTextField
								name="password"
								label="Password"
								type="password"
								validator={passwordValidator}
								onChange={setLoginData}
							/>
						</SplashFieldsContainer>
						<SplashFieldsContainer>
							{!localLoading && <Button type="submit" variant="contained">Login</Button>}
						</SplashFieldsContainer>
					</Box>
				<SplashFieldsContainer>
					{localLoading && <CircularProgress color="primary" size={50} />}
				</SplashFieldsContainer>
			</CenterContainer>
    </StyledContainer>
  )
}

export default Splash