import mongoose from 'mongoose';

import { seasonSchema as Season } from './seasonSchema';

const animeSchema = new mongoose.Schema({
	name: String,
	description: String,
	genre: [String],
	seasons: [Season],
});

const Anime = mongoose.model('anime', animeSchema);

export default Anime;
