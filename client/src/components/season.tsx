//* React
import React from 'react';
import { Link } from 'react-router-dom';

//* GraphQl
import { useQuery } from '@apollo/client';
import SEASON from '../graphql/queries/seasonQuery';

//* Chakra UI
import { Box, Button } from '@chakra-ui/react';

interface Props {
	id: string;
}

const Season: React.FC<Props> = props => {
	const { data, loading, error } = useQuery(SEASON, {
		variables: {
			id: props.id,
		},
	});
	console.log(data);
	return (
		<Box as='main' display='flex' flexWrap='wrap' className='season'>
			{loading && <div className='loading'>Loading ...</div>}
			{!loading && !error && !data && (
				<div className='no-result'>Could not find any result 😭</div>
			)}
			{error && <div className='error'>Error, gomenasai {'>~<'} </div>}
			{data &&
				data.seasonDetails &&
				data.seasonDetails.episodes.map(
					(episode: any, episodeIndex: number) => (
						<Button
							as={Link}
							to={`/watch/${props.id}`}
							minWidth='30%'
							height='7.5vh'
							margin='2vh auto'
							display='flex'
							flexDirection='row'
							justifyContent='left'>
							<Box>{episodeIndex + 1}</Box>
							<Box marginLeft='10vh'>{episode.name}</Box>
						</Button>
					)
				)}
		</Box>
	);
};

export default Season;
