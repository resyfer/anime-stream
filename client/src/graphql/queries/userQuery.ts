import { gql } from '@apollo/client';

const USER = gql`
	query User {
		user {
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
