//* React
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

//* Chakra UI
import {
	Button,
	ButtonGroup,
	Box,
	HStack,
	Image,
	InputGroup,
	InputRightAddon,
	Input,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

//* Context
import { UserContext } from '../context/userContext';

//* CSS
import './css/Navbar.scss';

//* Function Component
const Navbar: React.FC = () => {
	const { user, loggedIn, setSearch } = useContext(UserContext);

	const searchInput = useRef<any>();
	const searchButton = useRef<any>();
	return (
		<HStack
			as={'header'}
			className='navbar'
			spacing={8}
			padding='1.5vh 3vh'
			justifyContent='space-between'>
			<Box maxWidth='md' as={Link} to='/'>
				<Image src='/img/logo.svg' alt='logo' maxHeight='8vh' />
			</Box>

			{loggedIn && user && (
				<>
					<ButtonGroup>
						<Button variant='ghost' as={Link} to='/watch'>
							Watch
						</Button>
						{/* <Button variant='ghost' as={Link} to='/list'>
							List
						</Button>
						<Button variant='ghost' as={Link} to='/my-list'>
							My List
						</Button> */}
					</ButtonGroup>
					<InputGroup width='sm'>
						<Input
							placeholder='Search Anime ...'
							width='sm'
							ref={searchInput}
						/>
						<InputRightAddon
							cursor='pointer'
							onClick={() => {
								if (searchInput.current.value.trim() !== '') {
									setSearch(searchInput.current.value.trim());
									searchButton.current.click();
								}
							}}>
							<SearchIcon />
						</InputRightAddon>
						<Button as={Link} to='/search' display='none' ref={searchButton}>
							Search
						</Button>
					</InputGroup>
					<Menu>
						<MenuButton minWidth='5vh' alignItems='center' variant='outline'>
							<Image
								maxHeight='5vh'
								borderRadius='50%'
								src={`https://avatars.dicebear.com/api/identicon/${user.name}.svg`}
							/>
						</MenuButton>
						<MenuList>
							<MenuItem>
								My Profile
							</MenuItem>
							<MenuDivider />
							<MenuItem
								color='red'
								onClick={() => {
									let now = new Date();
									document.cookie =
										'jwt= ; expires=' + now.toUTCString() + '; path=/';
									window.location.reload();
								}}>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				</>
			)}
			{!loggedIn && (
				<ButtonGroup>
					<Button variant='ghost' as={Link} to='/login'>
						Login
					</Button>
					<Button variant='solid' color='blue.500' as={Link} to='/signup'>
						Signup
					</Button>
				</ButtonGroup>
			)}
		</HStack>
	);
};

//* Export
export default Navbar;
