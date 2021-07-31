import User from '../../../model/user';

export const admindeleteAccount = async (req, res, next) => {
	try {
		await User.findByIdAndUpdate(req.params.id, {
			accountStatus: 'deleted',
		});

		return res.status(204).json({ message: 'Account deleted by admin' });
	} catch (err) {
		next(err);
	}
};
