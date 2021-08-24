import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	list: [
		{
			_id: mongoose.SchemaTypes.ObjectId,
			status: Number,
			episodes: [Boolean],
			rating: Number,
		},
	],
});

const User = mongoose.model('user', UserSchema);

export default User;
