import Layout from '../../model/layout';

export const deleteLayout = async (req, res, next) => {
	try {
		await Layout.findByIdAndDelete(req.params.id);

		return res.status(204).json({ message: 'Layout deleted' });
	} catch (err) {
		next(err);
	}
};
