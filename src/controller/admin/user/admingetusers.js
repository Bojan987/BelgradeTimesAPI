import User from '../../../model/user';

export const adminGetUsers = async (req, res, next) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 8;
	const skip = (page - 1) * limit || 0;
	const sort =
		req.query.sort === 'latest' ? { createdAt: -1 } : { createdAt: 1 };
	const search =
		req.query.role === 'all' || !req.query.role
			? {}
			: { role: req.query.role.toLowerCase() };

	try {
		const totalUsers = await User.countDocuments(search);

		const usersPaginated = await User.find(search)
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.select(
				'firstName role position lastLogin avatar lastName accountStatus email'
			);

		if (!usersPaginated) {
			return res.status(500).json({ message: 'Error' });
		}

		return res.status(200).json({ numberOfUsers: totalUsers, usersPaginated });
	} catch (error) {
		next(error);
	}
};
