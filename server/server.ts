//* Dependencies
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

//* Module Imports
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

//* Dotenv
dotenv.config({ path: './config/.env' });

//* Start Server
(async () => {
	const app = express();
	app.use(cookieParser());

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => {
			if (req && req.cookies && req.cookies.jwt) {
				const token = req.cookies.jwt;

				const uid = jwt.verify(token, process.env['SECRET'] as string);

				return { uid };
			} else {
				return null;
			}
		},
	});
	await server.start();
	server.applyMiddleware({ app });
	console.log('GraphQL Server Started');

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
