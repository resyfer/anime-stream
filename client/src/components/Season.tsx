//* React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//* GraphQl
import { useQuery, useMutation } from '@apollo/client';
import SEASON from '../graphql/queries/seasonQuery';
import USER_DETAILS from '../graphql/queries/watchUserDetails';

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

	const [userDetails, { error: userError, data: userData }] = useMutation(
		USER_DETAILS,
		{
			variables: {
				seasonId: props.id,
			},
		}
	);

	useEffect(() => {
		if (data) userDetails();
	}, [data, userDetails]);

	return (
		<Box as='main' display='flex' flexWrap='wrap' className='season'>
			{loading && <div className='loading'>Loading ...</div>}
			{!loading && !error && !data && (
				<div className='no-result'>Could not find any result 😭</div>
			)}
			{(error || userError) && (
				<div className='error'>Error, gomenasai {'>~<'} </div>
			)}
			{data && userData && data.seasonDetails && (
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
								color={
									userData.userDetails.episodes[episodeIndex]
										? 'var(--theme2-100)'
										: 'var(--theme1-100-2)'
								}
								backgroundColor={
									userData.userDetails.episodes[episodeIndex]
										? 'var(--theme1-100-2)'
										: 'var(--theme2-100)'
								}
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
