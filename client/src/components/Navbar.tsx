//* React
import React, { useContext } from 'react';
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
	const { user, loggedIn, search, setSearch } = useContext(UserContext);
	console.log(search);
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
			<ButtonGroup>
				<Button variant='ghost' as={Link} to='/watch'>
					Watch
				</Button>
				<Button variant='ghost' as={Link} to='/list'>
					List
				</Button>
				<Button variant='ghost' as={Link} to='/my-list'>
					My List
				</Button>
			</ButtonGroup>
			<InputGroup width='sm'>
				<Input
					placeholder='Search Anime ...'
					value={search}
					width='sm'
					onChange={e => setSearch(e.target.value)}
				/>
				<InputRightAddon as={Link} to='/search'>
					<SearchIcon />
				</InputRightAddon>
			</InputGroup>
			{loggedIn && user && (
				<Menu>
					<MenuButton minWidth='5vh' alignItems='center' variant='outline'>
						{/* <HStack spacing={2}> */}
						<Image
							maxHeight='5vh'
							borderRadius='50%'
							src={`https://avatars.dicebear.com/api/identicon/${user.name}.svg`}
						/>
						{/* </HStack> */}
					</MenuButton>
					<MenuList>
						<MenuItem as={Link} to='/profile'>
							My Profile
						</MenuItem>
						<MenuDivider />
						//TODO : Add logout
						<MenuItem color='red'>Logout</MenuItem>
					</MenuList>
				</Menu>
			)}
		</HStack>
	);
};

//* Export
export default Navbar;
