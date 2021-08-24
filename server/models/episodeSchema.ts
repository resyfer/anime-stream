import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
	name: String,
	duration: Number,
});

export { episodeSchema };
