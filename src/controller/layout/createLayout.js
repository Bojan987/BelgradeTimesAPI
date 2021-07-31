import Layout from '../../model/layout';

const { ENV } = process.env;

export const createLayout = async (req, res, next) => {
	const image =
		ENV === 'DEV'
			? 'localhost:3000/layouts/' + req.file.filename
			: 'https://news.thinksmart.rs/api/layouts/' + req.file.filename;

	try {
		const layout = new Layout({
			name: req.body.name,
			image: image ? image : '',
			author: req.userId,
		});

		await layout.save();

		return res.status(201).json({
			message: 'Layout created',
		});
	} catch (error) {
		next(error);
	}
};
