import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";

import { StyledContainer } from "src/components/styled-components";
import { CenterContainer, SingleRowContainer, StyledTitle } from "src/pages/splash/splash-style";
import { useGetToken, useGetUser } from "src/api/apis";
import { AuthContext } from "src/app/app";
import ValidatedTextField from "src/components/ValidatedTextField";
import { emailValidator } from "src/utils/input-validators";
import { UserLoginType } from "src/utils/shared-types";

const Splash = () => {
	const navigate = useNavigate();
	const contextValue = useContext(AuthContext);
	const userToken = contextValue?.userToken;
	const [loginInfo, setLoginInfo] = useState<UserLoginType>({ username: '', password: '' });
	const tokenAPI = useGetToken({loginInfo});
	const userAPI = useGetUser({userToken});
	const localLoading = tokenAPI.isPending || userAPI.isLoading;

	useEffect(() => {
		if (userAPI.data) {
			contextValue?.saveUser({user: userAPI.data});
			navigate('/home');
		}
	},[contextValue, userAPI.data, navigate])

	useEffect(() => {
		if (tokenAPI.data) {
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
						<SingleRowContainer>
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
								onChange={setLoginData}
							/>
						</SingleRowContainer>
						<SingleRowContainer>
							{!localLoading && <Button type="submit" variant="contained">Login</Button>}
						</SingleRowContainer>
					</Box>
				<SingleRowContainer>
					{localLoading && <CircularProgress color="primary" size={75} />}
				</SingleRowContainer>
			</CenterContainer>
    </StyledContainer>
  )
}

export default Splash