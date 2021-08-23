import { gql } from '@apollo/client';

const AllBooks = gql`
	{
		books {
			title
		}
	}
`;

export default AllBooks;
