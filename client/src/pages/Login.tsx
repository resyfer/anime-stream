//* React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//* CSS
import './css/Login.scss';

//* Props
interface Props {
	title: string;
}

const Login: React.FC<Props> = props => {
	useEffect(() => {
		document.title = props.title;
	}, [props]);

	return (
		<main id='login'>
			<form id='login-form'>
				<label htmlFor='email'>
					Email ID:
					<input type='text' name='email' id='email' required />
				</label>
				<br />
				<label htmlFor='password'>
					Password:
					<input type='password' name='password' id='password' required />
				</label>
				<br />
				<button type='submit'>Login</button>
			</form>
			<Link to='/signup'>Signup</Link>
		</main>
	);
};

export default Login;
