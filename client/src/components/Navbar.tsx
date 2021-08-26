//* React
import React, { useContext } from 'react';

//* Context
import { UserContext } from '../context/userContext';

//* CSS
import './css/Navbar.scss';

//* Function Component
const Navbar: React.FC = () => {
	const { user, loggedIn, search, setSearch } = useContext(UserContext);

	return (
		<div className='navbar'>
			Navbar
			{/* <Button component={Link} to='/watch' className={classes.navItm}>
								Watch
							</Button>
							<Button component={Link} to='/list' className={classes.navItm}>
								List
							</Button>
							<Button component={Link} to='/browse' className={classes.navItm}>
								Browse
							</Button> */}
			{/* {loggedIn && (
							<Avatar
								className={classes.avatar}
								src={`https://avatars.dicebear.com/api/identicon/${user.name}.svg`}
								alt='Profile'
							/>
						)} */}
			{/* {!loggedIn && (
							<ButtonGroup>
								<Button className={classes.navItm} component={Link} to='/login'>
									Login
								</Button>
								<Button
									variant='contained'
									color='secondary'
									component={Link}
									to='/signup'>
									Sign Up
								</Button>
							</ButtonGroup>
						)} */}
		</div>
	);
};

//* Export
export default Navbar;
