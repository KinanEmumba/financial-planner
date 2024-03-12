import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";

import { StyledContainer, VerticalFieldsContainer } from "src/components/styled-components";
import { CenterContainer } from "src/pages/splash/splash-style";
import { useGetToken, useGetUser } from "src/api/apis";
import { AuthContext } from "src/app/app";
import ValidatedTextField from "src/components/ValidatedTextField";
import { emailValidator, passwordValidator } from "src/utils/input-validators";
import { UserLoginType } from "src/utils/shared-types";
import { SnackBarContext } from "src/app/snackbar-context";
import { CenteredText } from "src/components/shared-components";

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
		if (userAPI.error) {
			showSnackbar({
				message: `Error logging in ${userAPI.error.message}`,
				type: "error"
			});
		}
	},[userAPI.error, showSnackbar])

	useEffect(() => {
		if (userAPI.data) {
			showSnackbar({message: 'Successful Login', type: "success"});
			contextValue?.saveUser({user: userAPI.data});
			navigate('/home');
		}
	},[contextValue, userAPI.data, navigate, showSnackbar])

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
				<CenteredText variant='h2'>Financial Planner</CenteredText>
					<Box component="form" onSubmit={handleSubmit} noValidate>
						<VerticalFieldsContainer>
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
						</VerticalFieldsContainer>
						<VerticalFieldsContainer>
							{!localLoading && <Button type="submit" variant="contained">Login</Button>}
						</VerticalFieldsContainer>
					</Box>
				<VerticalFieldsContainer>
					{localLoading && <CircularProgress color="primary" size={50} />}
				</VerticalFieldsContainer>
			</CenterContainer>
    </StyledContainer>
  )
}

export default Splash