import { useContext } from "react";
import { AppBar } from "@mui/material"
import { StyledDashboard } from "src/pages/dashboard/dashboard-style"
import { StyledToolbar, StyledLinkButton } from "src/components/styled-components"
import { AuthContext } from "src/app/app";


const Dashboard = () => {
	const contextValue = useContext(AuthContext);
	console.log('dashboard contextValue', contextValue);
	return (
		<StyledDashboard>
			<AppBar position="sticky">
				<StyledToolbar variant="regular">
					<StyledLinkButton>Dashboard</StyledLinkButton>
					<StyledLinkButton>Financials</StyledLinkButton>
					<StyledLinkButton>Goals Setup</StyledLinkButton>
					<button onClick={() => contextValue?.signout()}>logout</button>
				</StyledToolbar>
			</AppBar>
		</StyledDashboard>
	)
}

export default Dashboard