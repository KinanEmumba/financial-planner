import { useContext, useState } from 'react'
import { Avatar, Menu, Divider, MenuItem } from '@mui/material'
import { StateContext } from 'src/app/app';

const UserAvatar = () => {
	const { appState } = useContext(StateContext) || {};
	const { user, signout } = appState || {};
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

	const handleClose = () => {
    setAnchorEl(null);
  };
	const avatarClicked = (e: React.MouseEvent<HTMLInputElement>) => {
    setAnchorEl(e.currentTarget);
  };

	return (
		<>
			<Avatar src={user?.avatar} onClick={avatarClicked}/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={(handleClose)}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem>Signed in as {user?.name}</MenuItem>
				<Divider />
				<MenuItem onClick={() => signout && signout()}>Logout</MenuItem>
			</Menu>
		</>
	)
}

export default UserAvatar