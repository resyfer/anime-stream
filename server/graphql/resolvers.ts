import User from '../models/userModel';
import { hash, genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserArgs {
	name: string;
	email: string;
	password: string;
}

const resolvers = {
	Query: {
		users: () => 'Hello World',
	},

	Mutation: {
		async registerUser(
			_parent: any,
			args: UserArgs,
			_context: any,
			_info: any
		) {
			try {
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
	},
};

export default resolvers;
