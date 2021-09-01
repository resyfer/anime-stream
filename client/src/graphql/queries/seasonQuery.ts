import { gql } from '@apollo/client';

const SEASON = gql`
	query season($id: String) {
		seasonDetails(id: $id) {
			episodes {
				name
			}
		}
	}
`;

export default SEASON;
