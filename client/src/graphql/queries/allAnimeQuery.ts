import { gql } from '@apollo/client';

const ALL_ANIME = gql`
	query searchAnime {
		anime {
			_id
			name
			img {
				thumbnail
			}
		}
	}
`;

export default ALL_ANIME;
