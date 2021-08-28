import mongoose from 'mongoose';

const seasonSchema = new mongoose.Schema({
	anime: mongoose.SchemaTypes.ObjectId,
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
