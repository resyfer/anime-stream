import { hash, genSalt, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';
import Anime from '../models/animeModel';

interface UserArgs {
	name?: string;
	email: string;
	password: string;
}

interface watchAnime {
	seasonId: string;
	episode: number;
	jwt: string;
}

interface Context {
	uid: string;
}

const resolvers = {
	Query: {
		async animes() {
			try {
				return await Anime.find();
			} catch (err) {
				return {
					error: 'There was an error, please try again',
				};
			}
		},

		async animeGenre(
			_parent: any,
			args: { genre: string },
			_context: Context,
			_info: any
		) {
			try {
				return await Anime.find({ genre: args.genre });
			} catch (err) {
				return {
					error: err,
				};
			}
		},

		async animeSearch(
			_parent: any,
			args: { name: string },
			_context: Context,
			_info: any
		) {
			try {
				return await Anime.find({
					name: { $regex: args.name, $options: 'i' },
				});
			} catch (err) {
				return {
					error: err,
				};
			}
		},

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

		async userList(_parent: any, _args: any, context: Context, _info: any) {
			try {
				if (context && context.uid) {
					const user = await User.findById(context.uid);

					const animePromises: any = [];
					user.list.forEach((season: any, index: number) => {
						animePromises[index] = Anime.findOne({ 'seasons._id': season._id });
					});

					return {
						user: await user,
						animes: await Promise.all([...animePromises]),
					};
				} else {
					return {
						error: 'Error finding list',
					};
				}
			} catch (err) {
				return {
					error: 'Error finding list',
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
			_context: Context,
			_info: any
		) {
			try {
				const anime = await Anime.findOne({
					'seasons._id': args.seasonId,
				});

				const seasonIndex = anime.seasons.findIndex(
					(season: any) => season._id == args.seasonId
				);
				anime.seasons[seasonIndex].views++;

				const userId = jwt.verify(args.jwt, process.env['SECRET'] as string);

				const user = await User.findById(userId);

				const userAnimeIndex: number = user.list.findIndex(
					(anime: any) => anime._id == args.seasonId
				);

				if (userAnimeIndex === -1) {
					user.list.push({
						_id: args.seasonId,
						status: 2,
						episodes: [],
						rating: 0,
					});

					for (let i = 0; i < anime.seasons[seasonIndex].episodes.length; i++)
						user.list[user.list.length - 1].episodes[i] = false;

					user.list[user.list.length - 1].episodes[args.episode] = true;
					await user.save();
				} else {
					user.list[userAnimeIndex].episodes[args.episode] = true;

					if (
						user.list[userAnimeIndex].episodes.every(
							(episode: boolean) => episode
						)
					) {
						user.list[userAnimeIndex].status = 1;
					}
					user.markModified('list'); //! Otherwise Mongoose won't know the array was modified. Similar to const
					await user.save();
				}

				return await anime.save();
			} catch (err) {
				return {
					error: err,
				};
			}
		},
	},
};

export default resolvers;
