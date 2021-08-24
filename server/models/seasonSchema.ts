import mongoose from 'mongoose';

import { episodeSchema as Episode } from './episodeSchema';

const seasonSchema = new mongoose.Schema({
	_id: mongoose.SchemaTypes.ObjectId,
	name: String,
	views: Number,
	rating: Number,
	episodes: [Episode],
	airing: {
		year: Number,
		season: String,
	},
	studio: String,
});

export { seasonSchema };
