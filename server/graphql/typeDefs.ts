import { gql } from 'apollo-server-express';

let typeDefs = gql`
	# Queries

	type User {
		name: String!
		email: String!
		password: String!
		list: [UserAnime]
	}

	type UserAnime {
		_id: ID
		status: Int
		episodes: [Boolean]
		rating: Float
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

		watchList: [UserAnime]
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

		watchAnime(seasonId: ID!, episode: Int!): Anime

		changeList(
			seasonId: ID!
			status: Int
			episode: Int
			episodeWatched: Boolean
			rating: Float
		): UserAnime
	}
`;

export default typeDefs;
