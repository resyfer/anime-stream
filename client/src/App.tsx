//* React
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

//* Dependencies
import Cookies from 'js-cookie';

//* Context
import { UserContext } from './context/userContext';

//* CSS
import './App.scss';

//* Pages
import Home from './pages/Home';
import Error404 from './pages/Error404';

//* Components
import Navbar from './components/Navbar';

//* URL
const url =
	process.env['NODE_ENV'] === 'development'
		? 'http://localhost:5000/graphql'
		: '/graphql';

//* Types
interface User {
	_id: string;
	name: string;
	email: string;
	list: [
		{
			_id: string;
			episodes: [Boolean];
			status: number;
			rating: number;
		}
	];
	error: any;
}

const cookie = Cookies.get('jwt');

//* GraphQL Queries
const USER = gql`
	query User($jwtCookie: String!) {
		user(jwt: $jwtCookie) {
			name
			email
			list {
				episodes
				status
			}
		}
	}
`;

//* Function Component
const App: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	const { loading, error, data } = useQuery(USER, {
		variables: { jwtCookie: cookie },
	});

	useEffect(() => {
		setUser(() => {
			if (data && !error) {
				setLoggedIn(true);
				return data.user;
			} else return null;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return (
		<div className='App'>
			<UserContext.Provider
				value={{ user, setUser, loggedIn, setLoggedIn, url }}>
				<Router>
					<Navbar />

					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>

						<Route path='/'>
							<Error404 />
						</Route>
					</Switch>
				</Router>
			</UserContext.Provider>
		</div>
	);
};

//* Export
export default App;
