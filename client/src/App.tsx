//* React
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//* Context
import { UserContext } from './context/userContext';

//* GraphQL
import { useQuery } from '@apollo/client';
import USER from './graphql/queries/userQuery';

//* CSS
import './App.scss';

//* Pages
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Signup from './pages/Signup';
import Login from './pages/Login';

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

//* Function Component
const App: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	const { loading, error, data } = useQuery(USER);

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
							{user && user.name}
							<Home title='Anime Stream | All your weeb needs in one place' />
						</Route>

						<Route exact path='/signup'>
							<Signup title='Signup | AnimeStream' />
						</Route>

						<Route exact path='/login'>
							<Login title='Login | AnimeStream' />
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
