import Book from '../models/bookModel';

const resolvers = {
	Query: {
		books: () => Book.find(),
	},
};

export default resolvers;
