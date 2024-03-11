import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, AppBar, Typography } from "@mui/material";
import UserAvatar from "src/components/UserAvatar";

const HomeTabs = () => {
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (location.pathname === '/home')
			navigate('dashboard');
	},[location.pathname, navigate]);

  const tabs = [
		{ label: 'Dashboard', to: '/home/dashboard' },
    { label: 'Goals', to: '/home/goals' },
    { label: 'Transactions', to: '/home/transactions' },
    { label: '', to: '' },
  ];

	const getTabIndex = () => {
    const currentTab = tabs.findIndex((tab) => tab.to === location.pathname);
    return currentTab === -1 ? 0 : currentTab;
  };

	return (
		<AppBar position="sticky" color={"primary"}>
			<Tabs
				value={getTabIndex()}
				role="navigation"
				variant="fullWidth"
				textColor="secondary"
				indicatorColor="secondary"
			>
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						label={<Typography variant="subtitle1">{tab.label}</Typography>}
						component={Link}
						to={tab.to}
						disableTouchRipple={index === 3}
						icon={index !== 3 ? undefined : <UserAvatar />}
						onClick={index !== 3 ? undefined : (e) => e.preventDefault()}
					/>
				))}
			</Tabs>
			<Outlet />
		</AppBar>
	)
}

export default HomeTabs