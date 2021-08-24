import { hash, genSalt, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';
import Anime from '../models/animeModel';

interface UserArgs {
	name?: string;
	email: string;
	password: string;
}

const resolvers = {
	Query: {
		async animes() {
			return await Anime.find();
		},
	},

	Mutation: {
		async registerUser(
			_parent: any,
			args: UserArgs,
			_context: any,
			_info: any
		) {
			try {
				const userExist = await User.findOne({ email: args.email });
				if (userExist)
					return {
						error: 'User Already Exists',
					};

				const hashedPwd = await hash(args.password, await genSalt());

				const user = new User({
					name: args.name,
					password: hashedPwd,
					email: args.email,
				});

				const userData: any = await user.save();

				const token = jwt.sign(userData.id, process.env['SECRET'] as string);

				return {
					name: userData.name,
					email: userData.email,
					jwt: token,
				};
			} catch (err) {
				console.log(err);
				return false;
			}
		},

		async loginUser(_parent: any, args: UserArgs, _context: any, _info: any) {
			try {
				const user = await User.findOne({ email: args.email });
				const login = await compare(args.password, user.password);
				const token = jwt.sign(user.id, process.env['SECRET'] as string);

				if (login) {
					return {
						name: user.name,
						jwt: token,
					};
				} else {
					return {
						error: 'Invalid email/password',
					};
				}
			} catch (err) {
				console.log(err);
				return {
					error: 'Invalid email/password',
				};
			}
		},
	},
};

export default resolvers;
