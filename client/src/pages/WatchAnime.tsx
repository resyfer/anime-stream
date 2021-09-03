//* React
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

//* GraphQl
import { useQuery, useMutation } from '@apollo/client';
import WATCH from '../graphql/queries/watchSeason';
import USER_DETAILS from '../graphql/queries/watchUserDetails';

//* Chakra UI
import { SimpleGrid, Button, Box, Text } from '@chakra-ui/react';

//* Props
interface Props {
	title: string;
}

const WatchAnime: React.FC<Props> = props => {
	const params: any = useParams();

	const { loading, error, data } = useQuery(WATCH, {
		variables: {
			seasonId: params.seasonId,
			episode: Number(params.episode),
		},
	});

	const [userDetails, { error: userError, data: userData }] = useMutation(
		USER_DETAILS,
		{
			variables: {
				seasonId: params.seasonId,
			},
		}
	);

	useEffect(() => {
		if (data) userDetails();
	}, [data, userDetails]);

	return (
		<div className='watch-anime'>
			{loading && <div className='loading'>Loading ...</div>}
			{!loading && !error && !data && (
				<div className='no-result'>Could not find any result 😭</div>
			)}
			{(error || userError) && (
				<div className='error'>Error, gomenasai {'>~<'} </div>
			)}
			{data && userData && data.watchAnime && (
				<>
					<Text margin='2vh 5%' textAlign='center' as='h3' fontSize='3.2vh'>
						{data.watchAnime.name.anime}
						{' : '} {data.watchAnime.name.season}
						{' - '}
						Episode {params.episode}
					</Text>
					<Box margin='5vh 0' display='flex' justifyContent='center'>
						<video
							src={data.watchAnime.episodes[Number(params.episode) - 1].video}
							controls></video>
					</Box>
					<SimpleGrid
						width='80%'
						minChildWidth='60px'
						spacing='10px'
						margin='5vh auto'
						className='episode-list'>
						{data.watchAnime.episodes.map(
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
									border={
										episodeIndex === Number(params.episode) - 1
											? '3px solid var(--theme2-100)'
											: 'none'
									}
									to={`/watch/${params.seasonId}/${episodeIndex + 1}`}>
									{episodeIndex + 1}
								</Button>
							)
						)}
					</SimpleGrid>
				</>
			)}
		</div>
	);
};

export default WatchAnime;
