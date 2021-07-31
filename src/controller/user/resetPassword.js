import User from '../../model/user';

export const resetPassword = async (req, res, next) => {
	const { password, email, resetCode, confirmPassword } = req.body;
	try {
		if (!password || !confirmPassword || !email || !resetCode) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('None existing user');
		}

		if (parseInt(resetCode) !== user.resetCode) {
			throw new Error('Wrong OTP code');
		}

		if (password !== confirmPassword) {
			throw new Error('Passwords do not match!');
		}

		user.password = password;
		await user.save();

		return res.status(200).json({ message: 'Password changed successfully!' });
	} catch (error) {
		next(error);
	}
};
