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
		_id: ID!
		status: Status!
		episodes: [Boolean]!
		rating: Float
	}

	enum Status {
		COMPLETED
		WATCHING
		ON_HOLD
		PLAN_TO_WATCH
		DROPPED
	}

	type Episode {
		name: String
		duration: Int
	}

	type Airing {
		year: Int
		season: String
	}

	type Season {
		_id: ID
		name: String
		views: Int
		rating: Int
		episodes: [Episode]
		airing: Airing
		studio: String
	}

	type Anime {
		_id: ID
		name: String
		description: String
		genre: [String]
		seasons: [Season]
		error: String
	}

	type Query {
		animes: [Anime]

		user(uid: ID!): User

		animeGenre(genre: String): [Anime]

		animeSearch(name: String): [Anime]
	}

	# Mutations

	type registerResponse {
		name: String
		email: String
		jwt: String
		error: String
	}

	type loginResponse {
		name: String
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
