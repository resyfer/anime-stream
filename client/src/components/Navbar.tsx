//* React
import React, { useContext } from 'react';

//* Context
import { UserContext } from '../context/userContext';

//* CSS
import './css/Navbar.scss';

//* Function Component
const Navbar: React.FC = () => {
	const { user, loggedIn } = useContext(UserContext);

	return (
		<div id='navbar'>
			Navbar
			{loggedIn && (
				<img
					src={`https://avatars.dicebear.com/api/identicon/${user.name}.svg`}
					alt='Profile Picture'
				/>
			)}
		</div>
	);
};

//* Export
export default Navbar;
