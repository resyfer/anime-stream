import { gql } from 'apollo-server-express';

let typeDefs = gql`
	# Queries

	type UserAnime {
		_id: ID
		status: Int
		episodes: [Boolean]
		rating: Float
	}

	type User {
		name: String!
		email: String!
		password: String!
		list: [UserAnime]
	}

	type animeSeasonList {
		_id: ID
		name: String
	}

	type Anime {
		_id: ID
		name: String
		description: String
		genre: [String]
		seasons: [animeSeasonList]
		img: Image
	}

	type Airing {
		year: Int
		season: String
	}

	type Episodes {
		name: String
		duration: Int
		video: String
	}

	type Image {
		thumbnail: String
		wallpaper: String
	}

	type SeasonName {
		anime: String
		season: String
	}

	type Stats {
		views: Int
		rating: Float
		likes: Int
	}

	type seasonAnime {
		_id: ID
		name: String
	}

	type Season {
		_id: ID

		anime: seasonAnime

		airing: [Airing]

		studio: String

		episodes: [Episodes]

		img: Image

		name: SeasonName

		stats: Stats

		error: String
	}

	# status:
	#	COMPLETED				0
	#	WATCHING				1
	#	ON_HOLD					2
	#	PLAN_TO_WATCH		3
	#	DROPPED					4

	type Query {
		user: User

		anime: [Anime]

		animeDetails(id: String): Anime

		watchAnime(seasonId: ID!, episode: Int!): Season

		seasonDetails(id: String): Season

		list: [Season]

		watchList: [UserAnime]

		searchAnime(anime: String): [Anime]
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

	type likeSeasonResponse {
		likes: Int
		error: String
	}

	type Mutation {
		registerUser(
			name: String!
			email: String!
			password: String!
		): registerResponse

		userDetails(seasonId: ID!): UserAnime

		loginUser(email: String!, password: String!): loginResponse

		likeSeason(seasonId: ID!, liked: Boolean!): likeSeasonResponse

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
