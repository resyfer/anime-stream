import { gql } from 'apollo-server-express';

let typeDefs = gql`
	type User {
		name: String!
		email: String!
		password: String!
		list: [UserAnime]
	}

	type UserAnime {
		id: ID!
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

	type Query {
		users: String
	}

	type registerResponse {
		name: String
		email: String
		jwt: String
	}

	type Mutation {
		registerUser(
			name: String!
			email: String!
			password: String!
		): registerResponse
	}
`;

export default typeDefs;
