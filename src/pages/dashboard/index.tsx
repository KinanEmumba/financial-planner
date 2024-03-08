import { AppBar} from "@mui/material"
import UserAvatar from "src/components/UserAvatar"

import {
	StyledDashboard,
	StyledLinkButton,
	StyledToolbar,
} from "src/pages/dashboard/dashboard-style"

const Dashboard = () => {
	return (
		<StyledDashboard>
			<AppBar position="sticky">
				<StyledToolbar variant="regular">
					<StyledLinkButton>Dashboard</StyledLinkButton>
					<StyledLinkButton>Financials</StyledLinkButton>
					<StyledLinkButton>Goals Setup</StyledLinkButton>
					<StyledLinkButton>
						<UserAvatar/>
					</StyledLinkButton>
				</StyledToolbar>
			</AppBar>
		</StyledDashboard>
	)
}

export default Dashboard