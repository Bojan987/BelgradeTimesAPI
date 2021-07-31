import Post from '../../model/post';

export const getPosts = async (req, res, next) => {
	const { page, category, visitsCounter, latest, limit } = req.query;
	const searchCriteria =
		category === '' || !category ? {} : { category: category };

	const sortCriteriaVisits =
		visitsCounter === '' || !visitsCounter ? {} : { visits: -1 };
	const sortCriteriaLatest = latest === '' || !latest ? {} : { createdAt: -1 };

	try {
		const posts = await Post.countDocuments(searchCriteria);

		const postsPaginated = await Post.find(searchCriteria)
			.populate('author', 'email firstName lastName socialAccounts _id avatar ')
			.populate('category', 'name')
			.skip((parseInt(page) - 1) * parseInt(limit))
			.limit(parseInt(limit))
			.sort(sortCriteriaVisits)
			.sort(sortCriteriaLatest);
		//.select("image title content createdAt author visits tags ")

		return res.status(200).json({ numberOfPosts: posts, postsPaginated });
	} catch (error) {
		next(error);
	}
};
