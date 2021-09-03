import { gql } from '@apollo/client';

const USER_DETAILS = gql`
	mutation UserDetails($seasonId: ID!) {
		userDetails(seasonId: $seasonId) {
			_id
			episodes
		}
	}
`;

export default USER_DETAILS;
