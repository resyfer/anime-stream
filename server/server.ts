//* Dependencies
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';

//* Module Imports
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

//* Dotenv
dotenv.config({ path: './config/.env' });

//* Start Server
(async () => {
	const app = express();

	process.env['NODE_ENV'] == 'development' &&
		app.use(
			cors({
				origin: 'https://studio.apollographql.com',
				credentials: true,
			})
		); //! For testing on Apollo

	app.use(cookieParser());
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req, res }) => {
			res.set({
				'Access-Control-Allow-Origin': 'https://studio.apollographql.com',
				'Access-Control-Allow-Credentials': true,
			});

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

	if (process.env['NODE_ENV'] != 'development') {
		app.get('/', (req, res) => {
			res.send(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
		});
	}

	app.listen(process.env['PORT'], () => {
		console.log(
			`Server connected to port ${process.env['PORT']} in mode ${process.env['NODE_ENV']}`
		);
	});
})();
