import { gql } from '@apollo/client';

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

export default USER;
