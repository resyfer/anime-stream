//* Dependencies
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//* Module Imports
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

//* Dotenv
dotenv.config({ path: './config/.env' });

//* Start Server
(async () => {
	const server = new ApolloServer({ typeDefs, resolvers });
	await server.start();

	console.log('GraphQL Server Started');

	const app = express();
	server.applyMiddleware({ app });

	await mongoose.connect(process.env['MONGO_URI'] as string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	console.log('DB Connected');

	app.listen(process.env['PORT'], () => {
		console.log(
			`Server connected to port ${process.env['PORT']} in mode ${process.env['NODE_ENV']}`
		);
	});
})();
