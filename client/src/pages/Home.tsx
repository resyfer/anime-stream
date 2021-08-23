//* React
import React from 'react';

//* Dependencies
import { useQuery } from '@apollo/client';

//* Module Imports
import AllBooks from '../graphql/queries/queries';

//* CSS
import './css/Home.scss';

type bookType = {
	title?: string;
	author?: string;
};

//* Function Component
const Home: React.FC = () => {
	// eslint-disable-next-line
	const { loading, error, data } = useQuery(AllBooks);
	return (
		<div id='home'>
			{data &&
				data.books.map((book: bookType) => (
					<div className='book'>{book.title}</div>
				))}
		</div>
	);
};

//* Export
export default Home;
