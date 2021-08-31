import { gql } from '@apollo/client';

const SEARCH_ANIME = gql`
	query searchAnime($anime: String) {
		searchAnime(anime: $anime) {
			name
		}
	}
`;
export default SEARCH_ANIME;
