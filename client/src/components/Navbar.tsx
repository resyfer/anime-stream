//* React
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	ButtonGroup,
	Input,
	Image,
	Menu,
	MenuItem,
} from 'semantic-ui-react';

//* Context
import { UserContext } from '../context/userContext';

//* CSS
import './css/Navbar.scss';

//* Function Component
const Navbar: React.FC = () => {
	const { user, loggedIn, search, setSearch } = useContext(UserContext);

	return (
		<header className='navbar'>
			<Menu secondary>
				<MenuItem as={Link} to='/'>
					<Image width={40} src='/img/logo.svg' avatar />
				</MenuItem>
				<MenuItem position='right'>
					<ButtonGroup>
						<Button basic color='youtube' as={Link} to='/watch'>
							Watch
						</Button>
						<Button basic color='youtube' as={Link} to='/list'>
							List
						</Button>
						<Button basic color='youtube' as={Link} to='/browse'>
							Browse
						</Button>
					</ButtonGroup>
				</MenuItem>
				<MenuItem position='right'>
					<Input
						icon={<Button icon={{ name: 'search' }} as={Link} to='/search' />}
						placeholder='Search Anime...'
						value={search}
						onChange={e => {
							setSearch(e.target.value);
						}}
					/>
				</MenuItem>
				<MenuItem position='right'>
					{loggedIn && (
						<Button basic as={Link} to='/profile'>
							<Image
								src={`https://avatars.dicebear.com/api/identicon/${user.name}.svg`}
								as={Link}
								to='/profile'
								avatar
							/>
							&emsp;
							<span>{user.name}</span>
						</Button>
					)}
					{!loggedIn && (
						<ButtonGroup>
							<Button color='red' basic as={Link} to='/login'>
								Login
							</Button>
							<Button color='blue' as={Link} to='/signup'>
								Signup
							</Button>
						</ButtonGroup>
					)}
				</MenuItem>
			</Menu>
		</header>
	);
};

//* Export
export default Navbar;
