import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	genre: [String],
	seasons: [
		{
			_id: mongoose.SchemaTypes.ObjectId,
			name: String,
		},
	],
	img: {
		wallpaper: String,
		thumbnail: String,
	},
});

const Anime = mongoose.model('anime', animeSchema);

export default Anime;
