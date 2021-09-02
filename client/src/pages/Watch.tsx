//* React
import React, { useEffect } from 'react';

//* GraphQL
import { useQuery } from '@apollo/client';
import ALL_ANIME from '../graphql/queries/allAnimeQuery';

//* Chakra UI
import { Box, Image, Text, Grid } from '@chakra-ui/react';

//* Props
interface Props {
	title: string;
}

//* Function Component
const Watch: React.FC<Props> = props => {
	const { loading, error, data } = useQuery(ALL_ANIME);

	useEffect(() => {
		document.title = props.title;
	}, [props]);

	return (
		<div className='watch'>
			{loading && <div className='loading'>Loading ...</div>}
			{!loading && !error && (!data || data.anime.length === 0) && (
				<div className='no-result'>Could not find any result 😭</div>
			)}
			{error && <div className='error'>Error, gomenasai {'>~<'} </div>}
			<Grid
				templateColumns='repeat(5, 1fr)'
				gap={4}
				width='95%'
				margin='0 auto'>
				{data &&
					data.anime.length !== 0 &&
					data.anime.map((anime: any, animeIndex: number) => (
						<Box
							key={animeIndex}
							width='15vw'
							height='25vw'
							borderWidth='2px'
							borderRadius='lg'
							overflow='hidden'
							cursor='pointer'
							_hover={{
								boxShadow: '0 0 1.5vh var(--theme2-100)',
								transition: '0.1s ease-in-out',
							}}
							onClick={() => {
								window.location.href = `/anime/${anime._id}`;
							}}>
							<Box height='20vw' overflow='hidden'>
								<Image loading='lazy' width='100%' src={anime.img.thumbnail} />
							</Box>
							<Text
								height='5vw'
								fontWeight='semibold'
								fontSize='2.5vh'
								textAlign='center'
								backgroundColor='var(--theme2-100)'
								color='var(--theme1-100)'
								display='flex'
								justifyContent='center'
								alignItems='center'>
								{anime.name}
							</Text>
						</Box>
					))}
			</Grid>
		</div>
	);
};

export default Watch;
