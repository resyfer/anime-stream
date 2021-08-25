//* React
import React, { useEffect } from 'react';

//* Dependencies
import { useQuery } from '@apollo/client';

//* Module Imports
import AllBooks from '../graphql/queries/queries';

//* CSS
import './css/Home.scss';

//* Props
interface Props {
	title: string;
}

//* Function Component
const Home: React.FC<Props> = props => {
	useEffect(() => {
		document.title = props.title;
	}, [props]);

	return <div id='home'>Home</div>;
};

//* Export
export default Home;
