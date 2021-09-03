import { gql } from '@apollo/client';

const WATCH = gql`
	query watch($seasonId: ID!, $episode: Int!) {
		watchAnime(seasonId: $seasonId, episode: $episode) {
			_id
			episodes {
				name
				video
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

export default WATCH;
