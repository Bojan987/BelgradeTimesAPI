import Layout from '../../model/layout';

export const getLayouts = async (req, res, next) => {
	const sort =
		req.query.sort === 'latest' ? { createdAt: -1 } : { updatedAt: -1 };

	const layouts = await Layout.find()
		.populate('author', 'firstName lastName role _id avatar ')
		.sort(sort);

	if (!layouts) {
		return res.status(404).json({ message: 'No layouts found' });
	}
	// // QUERY, NE BODY
	// const sort = req.query.sort;
	// if (sort === "latest") {
	//   layouts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
	// } else if (sort === "updated") {
	//   layouts.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
	// }
	return res.status(200).json({ results: layouts.length, layouts });
};
