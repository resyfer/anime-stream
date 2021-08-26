/* eslint-disable no-unused-vars */
//* React
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

//* Dependencies
import Cookies from 'js-cookie';

//* Context
import { UserContext } from '../context/userContext';

//* GraphQl
import { useMutation } from '@apollo/client';
import LOGIN_USER from '../graphql/mutations/loginMutation';

//* CSS
import './css/Login.scss';

//* Props
interface Props {
	title: string;
}

const Login: React.FC<Props> = props => {
	//* Set Document Title
	useEffect(() => {
		document.title = props.title;
	}, [props]);

	//* Context Values
	const { setUser, loggedIn, setLoggedIn } = useContext(UserContext);

	//* If signed in, relocate to homepage
	useEffect(() => {
		if (loggedIn) window.location.replace('/');
	}, [loggedIn]);

	//* Email ID & Password
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	//* GraphQL Mutation for User Login
	const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

	//* Add cookie & update states on successful logging
	useEffect(() => {
		if (data && !data.loginUser.error) {
			Cookies.set('jwt', data.loginUser.jwt, { expires: 365 });
			setUser(data.loginUser.user);
			setLoggedIn(true);
		}
	}, [data, setLoggedIn, setUser]);

	return (
		<main id='login'>
			{error && (
				<div className='error'>There was an error, please try again!</div>
			)}
			{data && data.loginUser.error && (
				<div className='error'>Incorrect Email Id/ Password</div>
			)}
			{loading && <div className='submitting'>Submitting...</div>}

			{!loading && (
				<form id='login-form'>
					<label>
						Email ID:
						<input
							type='text'
							name='email'
							id='email'
							required
							onChange={e => {
								setEmail(e.target.value);
							}}
						/>
					</label>
					<br />
					<label htmlFor='password'>
						Password:
						<input
							type='password'
							name='password'
							id='password'
							required
							onChange={e => {
								setPassword(e.target.value);
							}}
						/>
					</label>
					<br />
					<button
						type='submit'
						onClick={e => {
							e.preventDefault();
							loginUser({ variables: { email, password } });
						}}>
						Login
					</button>
				</form>
			)}
			<Link to='/signup'>Signup</Link>
		</main>
	);
};

export default Login;
