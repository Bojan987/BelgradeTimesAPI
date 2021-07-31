import Layout from '../../model/layout';

export const editLayout = async (req, res, next) => {
	try {
		await Layout.findByIdAndUpdate(req.params.id, {
			...req.body,
		});

		res.status(200).json({ message: 'Layout edited succsessfully !' });
	} catch (err) {
		next(err);
	}
};
