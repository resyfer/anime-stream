//* React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//* CSS
import './css/Signup.scss';

//* Props
interface Props {
	title: string;
}

const Signup: React.FC<Props> = props => {
	useEffect(() => {
		document.title = props.title;
	}, [props]);

	return (
		<main id='signup'>
			<form id='signup-form'>
				<label htmlFor='name'>
					Name:
					<input type='text' name='name' id='name' required />
				</label>
				<br />
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
				<button type='submit'>Sign Up</button>
			</form>
			<Link to='/login'>Login</Link>
		</main>
	);
};

export default Signup;
