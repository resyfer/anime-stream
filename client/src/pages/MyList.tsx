/* eslint-disable no-unused-vars */
//* React
import React, { useEffect } from 'react';

//* GraphQL
import { useQuery } from '@apollo/client';
import USER_LIST from '../graphql/queries/userListQuery';

//* Interface
interface Props {
	title: string;
}

//* Function Component
const MyList: React.FC<Props> = props => {
	//* Document Title
	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	// eslint-disable-next-line
	const { loading, error, data } = useQuery(USER_LIST);

	const status = ['Completed', 'Watching'];

	return (
		<main className='my-list'>
			{data &&
				data.userList.user.list.map((_anime: any, index: number) => (
					<React.Fragment key={index}>
						<div className='anime'>
							<div className='name'>{data.userList.animes[index].name}</div>
							<div className='name'>
								{data.userList.animes[index].seasons.map(
									(season: any, seasonIndex: number) => (
										<div className='season' key={`season${seasonIndex}`}>
											{season.name}
										</div>
									)
								)}
							</div>
						</div>
						<br />
						<br />
					</React.Fragment>
				))}
		</main>
	);
};

export default MyList;
