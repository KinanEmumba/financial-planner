import { useContext, useState } from 'react'
import { Avatar, Menu, Divider, MenuItem } from '@mui/material'
import { AuthContext } from 'src/app/app';
import { StyledUserAvatar } from 'src/components/styled-components';

const UserAvatar = () => {
	const { user, signout } = useContext(AuthContext) || {};
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

	const handleClose = () => {
    setAnchorEl(null);
  };
	const avatarClicked = (e: React.MouseEvent<HTMLInputElement>) => {
    setAnchorEl(e.currentTarget);
  };

	return (
		<StyledUserAvatar>
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
		</StyledUserAvatar>
	)
}

export default UserAvatar