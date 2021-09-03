//* React
import React from 'react';
import { Link } from 'react-router-dom';

//* GraphQl
import { useQuery } from '@apollo/client';
import SEASON from '../graphql/queries/seasonQuery';

//* Chakra UI
import { Box, Button, SimpleGrid } from '@chakra-ui/react';

interface Props {
	id: string;
}

const Season: React.FC<Props> = props => {
	const { data, loading, error } = useQuery(SEASON, {
		variables: {
			id: props.id,
		},
	});

	return (
		<Box as='main' display='flex' flexWrap='wrap' className='season'>
			{loading && <div className='loading'>Loading ...</div>}
			{!loading && !error && !data && (
				<div className='no-result'>Could not find any result 😭</div>
			)}
			{error && <div className='error'>Error, gomenasai {'>~<'} </div>}
			{data && data.seasonDetails && (
				<SimpleGrid
					width='80%'
					minChildWidth='60px'
					spacing='10px'
					margin='5vh auto'
					className='episode-list'>
					{data.seasonDetails.episodes.map(
						(episode: any, episodeIndex: number) => (
							<Button
								as={Link}
								maxWidth='60px'
								key={episodeIndex}
								to={`/watch/${props.id}/${episodeIndex + 1}`}>
								{episodeIndex + 1}
							</Button>
						)
					)}
				</SimpleGrid>
			)}
		</Box>
	);
};

export default Season;
