import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";

import { StyledContainer } from "src/components/styled-components";
import { CenterContainer, SingleRowContainer, StyledTitle } from "src/pages/splash/splash-style";
import { useGetToken, useGetUser } from "src/api/apis";
import { AuthContext } from "src/app/app";
import ValidatedTextField from "src/components/ValidatedTextField";
import { emailValidator, nameValidator } from "src/utils/input-validators";
import { UserLoginType } from "src/utils/shared-types";

const Splash = () => {
	const navigate = useNavigate();
	const contextValue = useContext(AuthContext);
	const userToken = contextValue?.userToken;
	const [loginInfo, setLoginInfo] = useState<UserLoginType>({username: '', password: ''});
	const tokenAPI = useGetToken({loginInfo});
	const userAPI = useGetUser({userToken});
	const localLoading = tokenAPI.isPending || userAPI.isLoading;
	const formValid = useRef({ name: false, email: false });

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

	const handleSubmit = (e: FormEvent) => {
		console.log(e);
    e.preventDefault();
    if (Object.values(formValid.current).every(isValid => isValid)) {
      alert("Form is valid! Submitting the form...");
    } else {
      alert("Form is invalid! Please check the fields...");
    }
  };

  return (
    <StyledContainer>
			<CenterContainer>
				<StyledTitle>
					Financial Planner
				</StyledTitle>
					<Box component="form" onSubmit={handleSubmit} noValidate>
						<SingleRowContainer>
							<ValidatedTextField
								label="Name"
								validator={nameValidator}
								onChange={isValid => (formValid.current.name = isValid)}
							/>
							<ValidatedTextField
								label="Email"
								validator={emailValidator}
								onChange={isValid => (formValid.current.email = isValid)}
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