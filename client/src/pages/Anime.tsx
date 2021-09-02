//* React
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//* GraphQL
import { useQuery } from '@apollo/client';
import ANIME from '../graphql/queries/animeQuery';

//* Chakra UI
import { Image, Box, Text, ButtonGroup, Button } from '@chakra-ui/react';

//* Components
import Season from '../components/Season';

//* CSS
import './css/Anime.scss';

//* Props
interface Props {
	title: string;
}

//* Function Component
const Anime: React.FC<Props> = props => {
	const params: any = useParams();

	const [seasonDisplay, setSeasonDisplay] = useState(false);
	const [seasonId, setSeasonId] = useState('');

	const { loading, error, data } = useQuery(ANIME, {
		variables: {
			id: params.animeId,
		},
	});

	useEffect(() => {
		document.title = props.title;
	}, [props]);

	return (
		<div className='watch'>
			{loading && <div className='loading'>Loading ...</div>}
			{!loading && !error && !data && (
				<div className='no-result'>Could not find any result 😭</div>
			)}
			{error && <div className='error'>Error, gomenasai {'>~<'} </div>}
			{data && data.animeDetails && (
				<>
					<Box position='relative' height='70vh' width='100%' overflow='hidden'>
						<Box
							height='100%'
							width='100%'
							position='absolute'
							top='50%'
							left='50%'
							transform='translate(-50%, -50%)'
							background='linear-gradient(90deg, rgba(0,0,0,0.8) 41%, rgba(0,0,0,0) 91%)'
							zIndex='-1'></Box>
						<Image
							position='absolute'
							top='70%'
							left='50%'
							transform='translate(-50%, -50%)'
							width='100%'
							src={data.animeDetails.img.wallpaper}
							alt='Wallpaper'
							zIndex='-2'
						/>
						<Text
							as='h1'
							fontSize='1.5rem'
							color='white'
							width='100%'
							textAlign='center'
							marginTop='2vh'>
							{data.animeDetails.name}
						</Text>
						<Text
							color='white'
							height='40%'
							width='60%'
							position='absolute'
							top='50%'
							left='2.5%'
							transform='translate(0, -50%)'
							overflowY='scroll'
							wordBreak='break-word'
							className='anime-desc'>
							{data.animeDetails.description}
						</Text>
						<ButtonGroup
							position='absolute'
							bottom='2vh'
							left='50%'
							transform='translate(-50%, 0)'>
							{data.animeDetails.seasons.map(
								(season: any, seasonIndex: number) => (
									<Button
										key={seasonIndex}
										variant='outline'
										backgroundColor='var(--theme1-100)'
										color='var(--theme2-100)'
										borderColor='var(--theme2-100)'
										onClick={() => {
											setSeasonDisplay(true);
											setSeasonId(season._id);
										}}>
										{season.name}
									</Button>
								)
							)}
						</ButtonGroup>
					</Box>
					{seasonDisplay && <Season id={seasonId} />}
				</>
			)}
		</div>
	);
};

export default Anime;
