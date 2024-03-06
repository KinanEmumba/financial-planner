import { StyledContainer, StyledLinkButton } from "src/components/styled-components";
import { Button, CircularProgress } from "@mui/material";
import { CenterContainer, SingleRowContainer, StyledTextField, StyledTitle } from "src/pages/splash/splash-style";
import { useGetUser } from "src/api/apis";
import { UserLoginType, UserType } from "src/helpers/shared-types";
import { useEffect, useState } from "react";

const Splash = () => {
	const [loginInfo, setLoginInfo] = useState<UserLoginType>({username: '', password: ''});
	const {isLoading, data, error} = useGetUser({...loginInfo});
	const [user, setUser] = useState<null | UserType>(null);
	const [localLoading, setLocalLoading] = useState<boolean>(true);
	const loading = isLoading || localLoading;

	useEffect(() => {
		const storedUser = sessionStorage.getItem('stored-user');
		if (storedUser) {
			const userObj = JSON.parse(storedUser);
			setUser(userObj); // goto homepage
		} else {
			setLocalLoading(false);
		}
	}, []);


  return (
    <StyledContainer>
			<CenterContainer>
				<StyledTitle>
					Financial Planner
				</StyledTitle>
				{!localLoading &&
				<SingleRowContainer>
					<StyledTextField label="User name" />
					<StyledTextField
						label="Password"
						type="password"
						autoComplete="current-password"
					/>
				</SingleRowContainer>}
				<SingleRowContainer>
					<Button variant="contained">Login</Button>
				</SingleRowContainer>
				{loading && 
				<SingleRowContainer>
					<CircularProgress color="primary" size={75} />
				</SingleRowContainer>}
			</CenterContainer>
    </StyledContainer>
  )
}

export default Splash