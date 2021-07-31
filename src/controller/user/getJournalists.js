import User from '../../model/user';

export const getJournalists = async (req, res, next) => {
	try {
		const journalists = await User.find({ role: 'journalist' }).select({ firstName: 1, lastName: 1, _id: 1});

		if (!journalists) {
			return res.status(404).json({ message: 'Error' });
		}

		return res.status(200).json({
			journalists,
		});
	} catch (error) {
		next(error);
	}
};
