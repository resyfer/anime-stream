import { gql } from 'apollo-server-express';

let typeDefs = gql`
	# Queries

	type User {
		name: String!
		email: String!
		password: String!
		list: [UserAnime]
	}

	# status:
	#	COMPLETED				0
	#	WATCHING				1
	#	ON_HOLD					2
	#	PLAN_TO_WATCH		3
	#	DROPPED					4

	type Query {
		# TODO: Add the custom types
		user: User

		anime: [Anime]

		watchList: 

	}
	# Mutations

	type registerResponse {
		user: User
		jwt: String
		error: String
	}

	type loginResponse {
		user: User
		jwt: String
		error: String
	}

	type Mutation {
		registerUser(
			name: String!
			email: String!
			password: String!
		): registerResponse

		loginUser(email: String!, password: String!): loginResponse

		watchAnime(seasonId: ID!, episode: Int!, jwt: String!): Anime
	}
`;

export default typeDefs;
