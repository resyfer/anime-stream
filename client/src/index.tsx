//* React
import React from 'react';
import ReactDOM from 'react-dom';

//* Chakra UI
import { ChakraProvider } from '@chakra-ui/react';

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
	<ApolloProvider client={client}>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
