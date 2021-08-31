//* React
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

//* Context
import { UserContext } from '../context/userContext';

//* Chakra UI
import {
	Box,
	Image,
	InputGroup,
	InputRightAddon,
	Input,
	ButtonGroup,
	Button,
	Text,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

//* CSS
import './css/Home.scss';

//* Props
interface Props {
	title: string;
}

//* Function Component
const Home: React.FC<Props> = props => {
	const { user, loggedIn, search, setSearch } = useContext(UserContext);

	useEffect(() => {
		document.title = props.title;
	}, [props]);

	return (
		<Box
			as='main'
			id='home'
			alignItems='center'
			justifyContent='center'
			flexDirection='row'
			position='absolute'
			top='50vh'
			left='50%'
			transform='translate(-50%, -50%)'
			boxSize='border-box'>
			<Image src='/img/logo.svg' alt='logo' margin='0 auto' maxWidth='35%' />
			{loggedIn && (
				<InputGroup minWidth='100%'>
					<Input
						minWidth='100%'
						placeholder='Search Anime ...'
						value={search}
						width='sm'
						onChange={e => setSearch(e.target.value)}
					/>
					<InputRightAddon as={Link} to='/search'>
						<SearchIcon />
					</InputRightAddon>
				</InputGroup>
			)}
			{!loggedIn && (
				<ButtonGroup
					minWidth='100%'
					alignItems='center'
					justifyContent='center'>
					<Button variant='ghost' as={Link} to='/login'>
						Login
					</Button>
					<Button variant='solid' color='blue.500' as={Link} to='/signup'>
						Signup
					</Button>
				</ButtonGroup>
			)}
		</Box>
	);
};

//* Export
export default Home;
