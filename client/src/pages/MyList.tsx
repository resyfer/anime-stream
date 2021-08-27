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
	console.log(data);

	const status = ['Completed', 'Watching'];

	return (
		<main className='my-list'>
			{data &&
				data.userList.user.list.map((season: any, index: number) => (
					<div className='anime' key={index}>
						{data.userList.animes[index].name}
					</div>
				))}
		</main>
	);
};

export default MyList;
