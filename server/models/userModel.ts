import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: String,
	password: String,
	list: [
		{
			id: mongoose.SchemaTypes.ObjectId,
			status: String,
			episodes: [Boolean],
			rating: Number,
		},
	],
});

const User = mongoose.model('user', UserSchema);

export default User;
