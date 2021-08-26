import { gql } from '@apollo/client';

const SIGNUP_USER = gql`
	mutation SignupUser($name: String!, $email: String!, $password: String!) {
		registerUser(name: $name, email: $email, password: $password) {
			jwt
			user {
				name
				email
			}
		}
	}
`;

export default SIGNUP_USER;
