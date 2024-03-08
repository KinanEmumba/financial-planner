import { useContext, useState } from 'react'
import { Avatar, Menu, Divider } from '@mui/material'
import { AuthContext } from 'src/app/app';
import { StyledMenuItem } from 'src/components/styled-components';

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
				<StyledMenuItem>Signed in as {user?.name}</StyledMenuItem>
				<Divider />
				<StyledMenuItem onClick={() => signout && signout()}>Logout</StyledMenuItem>
			</Menu>
		</>
	)
}

export default UserAvatar