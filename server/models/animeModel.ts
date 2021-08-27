import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	genre: [String],
	season: [mongoose.SchemaTypes.ObjectId],
});

const Anime = mongoose.model('anime', animeSchema);

export default Anime;
