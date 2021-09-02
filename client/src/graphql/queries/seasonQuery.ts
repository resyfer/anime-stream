import { gql } from '@apollo/client';

const SEASON = gql`
	query season($id: String) {
		seasonDetails(id: $id) {
			_id
			episodes {
				name
			}
			img {
				thumbnail
			}
			stats {
				likes
				rating
				views
			}
			airing {
				season
				year
			}
			name {
				anime
				season
			}
			studio
		}
	}
`;

export default SEASON;
