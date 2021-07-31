import User from '../../model/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const login = async (req, res, next) => {
	try {
		const { email, password, remember } = req.body;

		let existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new Error('User not found!');
		}

		if (!existingUser.emailConfirmed) {
			return res.status(401).json({ message: 'Not confirmed email' });
		}

		if (
			existingUser.accountStatus === 'deleted' ||
			existingUser.accountStatus === 'disabled' ||
			existingUser.accountStatus === 'inactive'
		) {
			return res.status(401).json({ message: 'User account is disabled' });
		}

		const match = await bcrypt.compare(password, existingUser.password);

		if (!match) {
			throw new Error('Incorrect password');
		}

		// user is valid > login

		const token = jwt.sign(
			{ id: existingUser._id, role: existingUser.role },
			JWT_SECRET,
			{
				expiresIn: remember ? '30d' : '1h',
			}
		);

		const date = new Date();
		const rememberUser = remember
			? date.setDate(date.getDate() + 30)
			: date.setHours(date.getHours() + 1);

		existingUser.lastLogin = date;
		existingUser.token = token;
		existingUser.tokenExpires = new Date(rememberUser).toLocaleString();

		await existingUser.save({ new: true, runValidators: true });

		res.setHeader('Authorization', `Bearer ${token}`);

		return res.status(200).json({
			message: 'User is logged in',
			user: existingUser,
			token,
		});
	} catch (error) {
		next(error);
	}
};
