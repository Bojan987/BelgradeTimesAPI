import User from '../../model/user';

export const getOurTeam = async (req, res, next) => {
	try {
		//manager journalist basic
		const managers = await User.find({ role: 'manager' }).limit(5);
		const journalists = await User.find({ role: 'journalist' }).limit(5);

		if (!managers || !journalists) {
			return res.status(404).json({ message: 'Error' });
		}

		return res.status(200).json({
			managers,
			journalists,
		});
	} catch (error) {
		next(error);
	}
};
