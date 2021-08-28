import { hash, genSalt, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';
import Season from '../models/seasonModel';
import Anime from '../models/animeModel';

interface UserArgs {
	name?: string;
	email: string;
	password: string;
}

interface watchAnime {
	seasonId: string;
	episode: number;
}

interface Context {
	uid: string;
}

const resolvers = {
	Query: {
		async user(_parent: any, _args: any, context: Context, _info: any) {
			try {
				if (context && context.uid) {
					return await User.findById(context.uid);
				} else {
					return {
						error: 'Could not find User',
					};
				}
			} catch (err) {
				return {
					error: 'Could not find User',
				};
			}
		},

		async anime() {
			try {
				return await Anime.find();
			} catch (err) {
				console.log(err);
				return {
					error: err,
				};
			}
		},

		async watchList(_parent: any, _args: any, context: Context, _info: any) {
			try {
				if (context && context.uid) {
					const user = await User.findById(context.uid);

					// TODO: Add season data in the list
					return await user.list;
				} else {
					return {
						error: 'User not authenticated',
					};
				}
			} catch (err) {
				console.log(err);
				return {
					error: 'There was an error fetching watch list data',
				};
			}
		},
	},

	Mutation: {
		async registerUser(
			_parent: any,
			args: UserArgs,
			_context: Context,
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
					user,
					jwt: token,
				};
			} catch (err) {
				return {
					error: 'There was an error',
				};
			}
		},

		async loginUser(
			_parent: any,
			args: UserArgs,
			_context: Context,
			_info: any
		) {
			try {
				const user = await User.findOne({ email: args.email });
				const login = await compare(args.password, user.password);
				const token = jwt.sign(user.id, process.env['SECRET'] as string);

				if (login) {
					return {
						user,
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

		async watchAnime(
			_parent: any,
			args: watchAnime,
			context: Context,
			_info: any
		) {
			try {
				const user = await User.findById(context.uid);
				const list: any[] = await user.list;

				const seasonIndex = list.findIndex(
					(season: string) => season === args.seasonId
				);

				if (seasonIndex === -1) {
					const season = await Season.findById(args.seasonId);

					const episodes: boolean[] = [];
					for (let i = 0; i < season.episodes.length; i++) episodes[i] = false;
					episodes[args.episode - 1] = true;

					if (args.episode <= episodes.length && args.episode >= 1) {
						user.list.push({
							_id: args.seasonId,
							status: 1,
							episodes,
							rating: 0,
						});
						user.markModified('list'); //! Otherwise Mongoose won't know the array was modified. Similar to const
						return await user.save();
					} else {
						return {
							error: 'Error finding such entity',
						};
					}
				} else {
					user.list[seasonIndex].episodes[args.episode - 1] = true;
					user.markModified('list'); //! Otherwise Mongoose won't know the array was modified. Similar to const
					await user.save();
				}
			} catch (err) {
				return {
					error: 'There was an error',
				};
			}
		},
	},
};

export default resolvers;
