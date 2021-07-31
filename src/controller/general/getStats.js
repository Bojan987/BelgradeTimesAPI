import fs from 'fs';
import Category from '../../model/category';
import Post from '../../model/post';
import Comment from '../../model/comment';
import User from '../../model/user';

export const getStats = async (req, res, next) => {
	try {
		//* ~~~ CATEGORIES ~~~
		let CATEGORY_STATS = {};

		const postsCount = await Post.countDocuments();
		const categoriesCount = await Category.countDocuments();
		const categories = await Category.find();

		// Count posts per category
		const postsPerCategoryId = await Post.aggregate([
			{
				$match: {},
			},
			{
				$group: { _id: '$category', total: { $sum: 1 } },
			},
		]);

		const categoryNames = await Category.find().select('name _id');

		const postsPerCategory = [];

		for (let post of postsPerCategoryId) {
			for (let cat of categoryNames) {
				if (post._id.toString() === cat._id.toString()) {
					post.total = `${Math.round((post.total * 100) / postsCount)}%`;
					const newObj = { ...post, name: cat.name };
					postsPerCategory.push(newObj);
				}
			}
		}

		CATEGORY_STATS.total = categoriesCount;
		CATEGORY_STATS.overview = postsPerCategory;

		//* ~~~ COMMENTS ~~~

		const COMMENT_STATS = {};
		const totalComments = await Comment.countDocuments();

		const commentability = await Post.aggregate([
			{
				$group: {
					_id: '$category',
					comments: { $sum: 1 },
				},
			},

			{
				$project: {
					comments: 1,
					percentage: {
						$multiply: [{ $divide: [100, totalComments] }, '$comments'],
					},
				},
			},
		]);

		for (let catInComments of commentability) {
			for (let cat of categoryNames) {
				if (catInComments._id.toString() === cat._id.toString()) {
					catInComments.percentage = `${Math.round(catInComments.percentage)}%`;
					catInComments.name = cat.name;
				}
			}
		}

		COMMENT_STATS.total = totalComments;
		COMMENT_STATS.commentability = commentability;

		// const comments = {};

		// for (let cat of categories) {
		// 	const sumComment = 0;

		// 	const posts = await Post.find({ category: cat._id });

		// 	for await (let post of posts) {
		// 		const numOfCommentsForPost = await Comment.countDocuments({
		// 			postRelated: post._id,
		// 		});
		// 		sumComment += numOfCommentsForPost;
		// 	}
		// 	const percentage = `${Math.floor((sumComment / totalComments) * 100)}%`;

		// 	comments[cat.name] = percentage;
		// }

		// const commentability = Object.keys(comments).map(function (key) {
		// 	return [String(key), comments[key]];
		// });
		// console.timeEnd('test');

		//*   ~~~ USER STATS ~~~

		const users = await User.find();
		const numOfUsers = users.length;

		const status = await User.aggregate([
			{
				$group: { _id: '$accountStatus', count: { $sum: 1 } },
			},
			{
				$project: {
					status: '$_id',
					count: 1,
					_id: 0,
				},
			},
		]);

		const dnevno = [];
		const mesecno = [];
		const godisnje = [];

		let brojacUsera = 0;

		const dateToday = new Date().getDate();
		const month = new Date().getMonth();
		const year = new Date().getFullYear();
		const startOfYear = new Date(year, 0, 1, 1).toISOString();
		const endOfYear = new Date(year, 11, 32).toISOString();
		// const dateToday = new Date().getDate();
		// const month = new Date().getMonth();
		// const year = new Date().getFullYear();
		// const startOfYear = new Date(year, 0, 1);
		// const endOfYear = new Date(year, 11, 31);

		const testing = await User.aggregate([
			{
				$match: { createdAt: { $lte: endOfYear } },
			},
		]);
		// const testing = await User.aggregate([
		// 	{
		// 		$project: {
		// 			date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
		// 		},
		// 	},
		// 	{
		// 		$group: {
		// 			_id: {
		// 				year: { $year: '$date' },
		// 				month: { $month: '$date' },
		// 				week: { $week: '$date' },
		// 				day: { $dayOfMonth: '$date' },
		// 			},
		// 			count: { $sum: 1 },
		// 		},
		// 	},
		// ]);
		console.log(testing);

		for (let user of users) {
			if (user.createdAt) {
				if (user.createdAt.getDate() == dateToday) {
					dnevno.push(user);
				}

				if (new Date().getDate > 7) {
					if (
						user.createdAt.getDate() > dateToday - 7 &&
						user.createdAt.getMonth() == month &&
						user.createdAt.getFullYear() == year
					) {
						brojacUsera++;
					}
				} else if (
					user.createdAt.getMonth() == month &&
					user.createdAt.getFullYear() == year
				) {
					brojacUsera++;
				}

				if (user.createdAt.getFullYear() == year) {
					godisnje.push(user);
				}
				if (user.createdAt.getMonth() == month) {
					mesecno.push(user);
				}
			}
		}

		const USER_STATS = {
			total: numOfUsers,
			status,
			registered: {
				today: dnevno.length,
				thisWeek: brojacUsera,
				thisMonth: mesecno.length,
				thisYear: godisnje.length,
			},
		};

		//*   ~~~ POST STATS ~~~

		const byCategories = {};
		const posts = await Post.find();

		for await (let cat of categories) {
			const brojPoKategoriji = await Post.countDocuments({
				category: cat._id,
			});
			byCategories[cat.name] = brojPoKategoriji;
		}

		const byCateg = Object.keys(byCategories).map(function (key) {
			return [String(key), byCategories[key]];
		});

		let brojacDanasnjih = 0;
		let brojacNedeljnih = 0;
		let brojacMesecnih = 0;
		let brojacGodisnjih = 0;

		for (let i = 0; i < posts.length; i++) {
			if (
				posts[i].createdAt.getDate() == dateToday &&
				posts[i].createdAt.getMonth() == month &&
				posts[i].createdAt.getFullYear() == year
			) {
				brojacDanasnjih++;
			}

			if (new Date().getDate > 7) {
				if (
					posts[i].createdAt.getDate() > dateToday - 7 &&
					posts[i].createdAt.getMonth() == month &&
					posts[i].createdAt.getFullYear() == year
				) {
					brojacNedeljnih++;
				}
			} else if (
				posts[i].createdAt.getMonth() == month &&
				posts[i].createdAt.getFullYear() == year
			) {
				brojacNedeljnih++;
			}

			if (
				posts[i].createdAt.getMonth() == month &&
				posts[i].createdAt.getFullYear() == year
			) {
				brojacMesecnih++;
			}

			if (posts[i].createdAt.getFullYear() == year) {
				brojacGodisnjih++;
			}
		}

		const POST_STATS = {
			total: posts.length,
			overview: {
				byCateg,
			},
			published: {
				today: brojacDanasnjih,
				thisWeek: brojacNedeljnih,
				thisMonth: brojacMesecnih,
				thisYear: brojacGodisnjih,
			},
		};

		// const json = JSON.stringify({
		// 	POST_STATS,
		// 	// COMMENT_STATS,
		// 	CATEGORY_STATS,
		// 	USER_STATS,
		// });
		// await fs.writeFileSync('stats.json', json);

		return res.status(200).json({
			CATEGORY_STATS,
			COMMENT_STATS,
			USER_STATS,
			POST_STATS,
		});
	} catch (err) {
		next(err);
	}
};
