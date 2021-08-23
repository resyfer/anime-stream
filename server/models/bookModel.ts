import mongoose from 'mongoose';

interface BookInterface {
	title: string;
	author: string;
}

const bookSchema = new mongoose.Schema<BookInterface>({
	title: String!,
	author: String!,
});

const Book = mongoose.model('book', bookSchema);

export default Book;
