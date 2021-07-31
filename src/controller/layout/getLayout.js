import Layout from '../../model/layout';

export const getLayout = async (req, res, next) => {
	try {
		const layout = await Layout.findById(req.params.layoutId);

		if (!layout) {
			return res.status(404).json({ message: 'No layout found' });
		}

		return res.status(200).json({ layout });
	} catch (error) {
		next(error);
	}
};
