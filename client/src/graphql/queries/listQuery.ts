import { gql } from '@apollo/client';

const LIST = gql`
	query list {
		list {
			_id
			anime {
				name
				_id
			}
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
