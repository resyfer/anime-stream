import { gql } from '@apollo/client';

const USER_LIST = gql`
	query UserList {
		userList {
			animes {
				name
				seasons {
					name
					episodes {
						name
					}
				}
			}
			user {
				list {
					episodes
					rating
					status
				}
			}
		}
	}
`;

export default USER_LIST;
