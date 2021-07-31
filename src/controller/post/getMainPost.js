import Post from '../../model/post';

export const getMainPost = async (req, res, next) => {
	try {
		const mainPost = await Post.findOne({ main: true })
			.populate('category')
			.populate('author', 'firstName lastName _id avatar')
			.select('title content _id createdAt updatedAt');
		if (!mainPost) {
			throw new Error('No main posts');
		}

		return res.status(201).json({ mainPost });
	} catch (error) {
		next(error);
	}
};
