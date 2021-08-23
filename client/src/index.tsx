//* React
import React from 'react';
import ReactDOM from 'react-dom';

//* Module Imports
import App from './App';

//* GraphQL
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
	uri:
		process.env['NODE_ENV'] === 'development'
			? 'http://localhost:5000/graphql'
			: '/graphql',
	cache: new InMemoryCache(),
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
