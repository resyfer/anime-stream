//* React
import React from 'react';
import { Link, useParams } from 'react-router-dom';

//* GraphQl
import { useQuery } from '@apollo/client';
import SEASON from '../graphql/queries/seasonQuery';

//* Chakra UI
import { SimpleGrid, Button } from '@chakra-ui/react';

//* Props
interface Props {
	title: string;
}

const WatchAnime: React.FC<Props> = props => {
	const params: any = useParams();

	//TODO: Add watch anime query

	const { loading, error, data } = useQuery(SEASON, {
		variables: {
			id: params.seasonId,
		},
	});

	return (
		<div className='watch-anime'>
			{loading && <div className='loading'>Loading ...</div>}
			{!loading && !error && !data && (
				<div className='no-result'>Could not find any result 😭</div>
			)}
			{error && <div className='error'>Error, gomenasai {'>~<'} </div>}
			{data && data.seasonDetails && (
				// <div className='video'>{data.seasonDetails.episodes[params.episode - 1].video}</div>
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
								to={`/watch/${params.seasonId}/${episodeIndex + 1}`}>
								{episodeIndex + 1}
							</Button>
						)
					)}
				</SimpleGrid>
			)}
		</div>
	);
};

export default WatchAnime;
