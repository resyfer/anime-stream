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
import SIGNUP_USER from '../graphql/mutations/signupMutation';

//* CSS
import './css/Signup.scss';

//* Props
interface Props {
	title: string;
}

const Signup: React.FC<Props> = props => {
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
	const [name, setName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);

	//* GraphQL Mutation for User Signup
	const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

	//* Add cookie & update states on successful logging
	useEffect(() => {
		if (data && !data.registerUser.error) {
			Cookies.set('jwt', data.registerUser.jwt, { expires: 365 });
			setUser(data.registerUser.user);
			setLoggedIn(true);
		}
	}, [data, setLoggedIn, setUser]);

	return (
		<main id='signup'>
			{error && (
				<div className='error'>There was an error, please try again!</div>
			)}
			{data && data.registerUser.error && (
				<div className='error'>Incorrect Email Id/ Password</div>
			)}
			{loading && <div className='submitting'>Submitting...</div>}

			{!loading && (
				<form id='signup-form'>
					<label>
						Name:
						<input
							type='text'
							name='name'
							id='name'
							required
							onChange={e => {
								setName(e.target.value);
							}}
						/>
					</label>
					<br />
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
							if (name && email && password)
								signupUser({ variables: { name, email, password } });
						}}>
						SignUp
					</button>
				</form>
			)}
			<Link to='/signup'>Signup</Link>
		</main>
	);
};

export default Signup;
