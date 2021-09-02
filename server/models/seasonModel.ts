import mongoose from 'mongoose';

const seasonSchema = new mongoose.Schema({
	anime: {
		_id: mongoose.SchemaTypes.ObjectId,
		name: String,
	},
	airing: [
		{
			year: Number,
			season: String,
		},
	],
	studio: String,
	episodes: [
		{
			name: String,
			duration: Number,
			video: String,
		},
	],
	img: {
		thumbnail: String,
		wallpaper: String,
	},
	name: {
		anime: String,
		season: String,
	},
	stats: {
		views: Number,
		rating: Number,
		likes: Number,
	},
});

const Season = mongoose.model('season', seasonSchema);

export default Season;
