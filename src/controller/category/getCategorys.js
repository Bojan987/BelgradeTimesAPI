import Category from '../../model/category';

export const getCategorys = async (req, res, next) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page - 1) * limit || 0;

	const sort =
		req.query.sort === 'latest' ? { createdAt: -1 } : { numOfPosts: -1 };

	try {
		const categorys = await Category.find()
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.populate('author', 'firstName lastName _id avatar');

		if (!categorys) {
			return res.status(404).json({ message: 'Error' });
		}

		return res.status(200).json({ results: categorys.length, categorys });
	} catch (error) {
		next(error);
	}
};
