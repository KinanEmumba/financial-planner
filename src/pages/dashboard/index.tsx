import { AppBar } from "@mui/material"
import { StyledDashboard } from "src/pages/dashboard/dashboard-style"
import { StyledToolbar, StyledLinkButton } from "src/components/styled-components"


const Dashboard = () => {
	return (
		<StyledDashboard>
			<AppBar position="sticky">
				<StyledToolbar variant="regular">
					<StyledLinkButton>Primary</StyledLinkButton>
					<StyledLinkButton>Primary</StyledLinkButton>
					<StyledLinkButton>Primary</StyledLinkButton>
				</StyledToolbar>
			</AppBar>
		</StyledDashboard>
	)
}

export default Dashboard