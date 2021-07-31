import Post from '../../model/post';

export const getPrimaryPosts = async (req, res, next) => {
	try {
		const primaryPosts = await Post.find({
			category: req.params.categoryId,
			primary: true,
		}).populate('author', 'firstName lastName avatar');

		if (!primaryPosts) {
			return res.status(400).json({ message: 'Error' });
		}

		return res
			.status(200)
			.json({ primaryPosts, numOfPrimaryPosts: primaryPosts.length });
	} catch (error) {
		next(error);
	}
};
