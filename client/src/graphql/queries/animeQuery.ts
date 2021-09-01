import { gql } from '@apollo/client';

const ANIME = gql`
	query anime($id: String) {
		animeDetails(id: $id) {
			name
			img {
				wallpaper
			}
			seasons {
				name
				_id
			}
			description
			genre
		}
	}
`;

export default ANIME;
