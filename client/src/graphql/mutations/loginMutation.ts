import { gql } from '@apollo/client';

const LOGIN_USER = gql`
	mutation LoginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			jwt
			user {
				name
				email
			}
			error
		}
	}
`;

export default LOGIN_USER;
