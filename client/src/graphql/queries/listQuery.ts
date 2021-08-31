import { gql } from '@apollo/client';

const LIST = gql`
	query list {
		list {
			_id
			anime
			name {
				anime
				season
			}
			img {
				thumbnail
			}
		}
	}
`;
export default LIST;
