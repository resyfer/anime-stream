//* React
import React, { useEffect } from 'react';

//* GraphQL
import { useQuery } from '@apollo/client';
import LIST from '../graphql/queries/listQuery';

//* Chakra UI
import { Box, Image, Text, Grid } from '@chakra-ui/react';

//* Props
interface Props {
	title: string;
}

//* Function Component
const List: React.FC<Props> = props => {
	const { loading, error, data } = useQuery(LIST);

	useEffect(() => {
		document.title = props.title;
	}, [props]);
	console.log(data, error);
	return (
		<div className='watch'>
			{loading && <div className='loading'>Loading ...</div>}
			{!loading && !error && (!data || data.list.length === 0) && (
				<div className='no-result'>Could not find any result 😭</div>
			)}
			{error && <div className='error'>Error, gomenasai {'>~<'} </div>}
			<Grid
				templateColumns='repeat(5, 1fr)'
				gap={4}
				width='95%'
				margin='0 auto'>
				{data &&
					data.list.length != 0 &&
					data.list.map((season: any) => (
						<Box
							width='15vw'
							height='27.5vw'
							borderWidth='2px'
							borderRadius='lg'
							overflow='hidden'
							cursor='pointer'
							_hover={{
								boxShadow: '0 0 1.5vh var(--theme2-100)',
								transition: '0.1s ease-in-out',
							}}
							onClick={() => {
								window.location.href = `/list/${season._id}`;
							}}>
							<Box height='20vw' overflow='hidden'>
								<Image loading='lazy' width='100%' src={season.img.thumbnail} />
							</Box>
							<Text
								height='7.5vw'
								fontWeight='semibold'
								fontSize='2.5vh'
								textAlign='center'
								backgroundColor='var(--theme2-100)'
								color='var(--theme1-100)'
								display='flex'
								padding='5px'
								justifyContent='center'
								alignItems='center'>
								{season.name.anime +
									(season.name.season != '' ? ' : ' + season.name.season : '')}
								<br />
							</Text>
						</Box>
					))}
			</Grid>
		</div>
	);
};

export default List;
