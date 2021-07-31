import Post from '../../model/post';

export const getPostsBySearch = async (req, res, next) => {
	let { page, category, select, par, limit } = req.query;

	// pagination
	select = select === 'latest' ? { createdAt: -1 } : { visits: -1 };
	page = page * 1 || 1;
	limit = limit * 1 || 12;
	const skip = (page - 1) * limit || 0;

	// query parameters
	const titleQuery = par.toLowerCase();
	const tagQuery = par.toLowerCase().split(',');

	//extract # from query params
	let query = [];

	for (let el of tagQuery) {
		if (el.startsWith('#')) {
			const word = el.slice(1);
			query.push(word);
		}
	}

	try {
		if (category === 'all') {
			if (!par.startsWith('#')) {
				// count docs
				const totalPosts = await Post.countDocuments({
					$text: { $search: `\"${titleQuery}\"` },
				});

				// query docs
				const postsPaginated = await Post.find({
					$text: { $search: `\"${titleQuery}\"` },
				})
					.skip(skip)
					.limit(limit)
					.sort(select)
					.populate('author', 'firstName lastName _id');

				if (!postsPaginated) {
					return res.status(400).json({ message: 'Error' });
				}

				return res.status(200).json({
					totalPosts,
					postsPaginated,
				});
			}
			//*  query by tags
			const totalPosts = await Post.countDocuments({ tags: { $in: query } });

			// query docs
			const postsPaginated = await Post.find({
				tags: { $in: query },
			})
				.skip(skip)
				.limit(limit)
				.sort(select)
				.populate('author', 'firstName lastName _id');

			if (!postsPaginated) {
				return res.status(400).json({ message: 'Error' });
			}

			return res.status(200).json({
				totalPosts,
				postsPaginated,
			});
		}
		//* QUERY WITHIN SELECTED CATEGORY
		else if (category !== 'all') {
			if (!par.startsWith('#')) {
				let titles = [];

				const posts = await Post.find({ category }).populate(
					'author',
					'firstName lastName _id'
				);

				for (let post of posts) {
					if (post.title.includes(titleQuery)) {
						titles.push(post);
					}
				}

				select === 'latest'
					? titles.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
					: titles.sort((a, b) => b.visits - a.visits);

				const postsPaginated = titles.slice(skip, skip + limit);

				return res.status(200).json({
					totalPosts: titles.length,
					postsPaginated,
				});
			}
			//* query category by tags
			const totalPosts = await Post.countDocuments({
				category,
				tags: { $in: query },
			});

			const postsPaginated = await Post.find({
				category,
				tags: { $in: query },
			})
				.skip(skip)
				.limit(limit)
				.sort(select)
				.populate('author', 'firstName lastName _id');

			return res.status(200).json({
				totalPosts,

				postsPaginated,
			});
		}
	} catch (error) {
		next(error);
	}
};

// export const getPostsBySearch = async (req, res, next) => {
// 	const { page, category, select, par, limit } = req.query;

// 	try {
// 		// const posts = await Post.find().populate(
// 		// 	'author',
// 		// 	'firstName lastName _id'
// 		// );

// 		const tagged = [];
// 		const titled = [];
// 		const tagCateg = [];
// 		const titleCateg = [];

// 		// UNOS VISE PARAMETARA;SECKANJE;NIZ STRINGOVA

// 		const paramArg = par.toLowerCase().split(',');
// 		console.log(paramArg);

// 		const posts = await Post.find({ tags: { $in: paramArg } }).populate(
// 			'author',
// 			'firstName lastName _id'
// 		);

// 		if (!posts) {
// 			return res.status(400).send({ message: 'Error occured' });
// 		}

// 		tagged.push(...posts);

// 		// for (let i = 0; i < posts.length; i++) {
// 		// 	for (let j = 0; j < posts[i].tags.length; j++) {
// 		// 		for (let k = 0; k < paramArg.length; k++) {
// 		// 			if (posts[i].tags[j].toLowerCase() === paramArg[k].toLowerCase()) {
// 		// 				tagged.push(posts[i]);
// 		// 				break;
// 		// 			} else {
// 		// 				break;
// 		// 			}
// 		// 		}
// 		// 	}
// 		// }

// 		const categoryMatch = tagged.find(el => el.category == category);

// 		if (categoryMatch) {
// 			tagCateg.push(categoryMatch);

// 			select === 'latest'
// 				? tagCateg.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
// 				: tagCateg.sort((a, b) => b.visits - a.visits);
// 		}

// 		// for (let k = 0; k < tagged.length; k++) {
// 		// 	if (String(tagged[k].category) == category) {
// 		// 		tagCateg.push(tagged[k]);
// 		// 		if (select === 'latest') {
// 		// 			tagCateg.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
// 		// 		} else if (select === 'visits') {
// 		// 			tagCateg.sort((a, b) => b.visits - a.visits);
// 		// 			// tagCateg.sort((a, b) => (a.visits > b.visits ? -1 : 1));
// 		// 		}
// 		// 	} else {
// 		// 		continue;
// 		// 	}
// 		// }

// 		// PO TITLU FILTER

// 		for (let i = 0; i < posts.length; i++) {
// 			for (let k = 0; k < paramArg.length; k++) {
// 				if (posts[i].title.toLowerCase().includes(paramArg[k].toLowerCase())) {
// 					titled.push(posts[i]);
// 					break;
// 				} else {
// 					continue;
// 				}
// 			}
// 		}

// 		for (let k = 0; k < titled.length; k++) {
// 			if (String(titled[k].category) == category) {
// 				titleCateg.push(titled[k]);
// 				if (select === 'latest') {
// 					titleCateg.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
// 				} else if (select === 'visits') {
// 					titleCateg.sort((a, b) => (a.visits > b.visits ? -1 : 1));
// 				}
// 			} else {
// 				continue;
// 			}
// 		}

// 		// PRIKAZ
// 		const preskoci = page == 1 ? 0 : (parseInt(page) - 1) * parseInt(limit);

// 		if (category === 'all') {
// 			if (tagged.length > 0) {
// 				const postsLength = tagged.length;
// 				const posts = tagged.slice(preskoci, preskoci + limit);

// 				return res.status(201).json({ postsLength, posts });
// 				// return res.status(200).json({ test });
// 			} else if (titled.length > 0) {
// 				const postsLength = titled.length;
// 				const posts = titled.slice(preskoci, preskoci + limit);
// 				return res.status(201).json({ postsLength, posts });
// 			} else {
// 				return res.status(201).json({ message: 'There is no match' });
// 			}
// 		}

// 		if (tagCateg.length > 0) {
// 			const postsLength = tagCateg.length;
// 			const posts = tagCateg.slice(preskoci, preskoci + limit);
// 			return res.status(201).json({ postsLength, posts });
// 		} else if (titleCateg.length > 0) {
// 			const postsLength = titleCateg.length;
// 			const posts = titleCateg.slice(preskoci, preskoci + limit);
// 			return res.status(201).json({ postsLength, posts });
// 		} else {
// 			return res.status(201).json({ message: 'There are no matching posts' });
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// };
