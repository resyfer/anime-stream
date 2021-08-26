//* React
import React from 'react';
import ReactDOM from 'react-dom';

//* Module Imports
import App from './App';

//* GraphQL
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

const link = createHttpLink({
	uri: '/graphql',
	credentials: 'same-origin',
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
});

//* React Render
ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
