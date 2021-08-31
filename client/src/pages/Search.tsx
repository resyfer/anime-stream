//* React
import React, { useEffect, useContext } from 'react';

//* Context
import { UserContext } from '../context/userContext';

//* GraphQL
import { useQuery } from '@apollo/client';
import SEARCH_ANIME from '../graphql/queries/searchAnime';

//* CSS
import './css/Home.scss';

//* Props
interface Props {
	title: string;
}

//* Function Component
const Search: React.FC<Props> = props => {
	const { search } = useContext(UserContext);

	const { loading, error, data } = useQuery(SEARCH_ANIME, {
		variables: {
			anime: search,
		},
	});

	useEffect(() => {
		document.title = props.title;
	}, [props]);

	return (
		<div className='hello'>
			{data &&
				data.searchAnime.map((anime: any) => (
					<div className='anime'>{anime.name}</div>
				))}
		</div>
	);
};

export default Search;
