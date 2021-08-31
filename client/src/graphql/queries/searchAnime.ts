import { gql } from '@apollo/client';

const SEARCH_ANIME = gql`
	query searchAnime($anime: String) {
		searchAnime(anime: $anime) {
			_id
			name
			img {
				thumbnail
			}
		}
	}
`;
export default SEARCH_ANIME;
