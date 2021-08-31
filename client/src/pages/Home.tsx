//* React
import React, { useEffect, useContext, useRef } from 'react';
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

	const searchInput = useRef<any>();
	const searchButton = useRef<any>();

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
				<>
					<InputGroup minWidth='100%'>
						<Input
							minWidth='100%'
							placeholder='Search Anime ...'
							width='sm'
							ref={searchInput}
						/>
						<InputRightAddon
							cursor='pointer'
							onClick={() => {
								if (searchInput.current.value.trim() != '') {
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
					<br />
					<ButtonGroup
						minWidth='100%'
						alignItems='center'
						justifyContent='center'>
						<Button variant='outline' as={Link} to='/watch'>
							Watch
						</Button>
						<Button variant='outline' as={Link} to='/list'>
							List
						</Button>
						<Button variant='outline' as={Link} to='/my-list'>
							My List
						</Button>
					</ButtonGroup>
				</>
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
