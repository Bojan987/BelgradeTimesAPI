import express from 'express';

import {
	getCategorys,
	createCategory,
	editCategory,
	deleteCategory,
	getSingleCategory,
	getHomeCategory,
} from '../controller/category';
import {
	authMiddleware,
	isRoleMiddleware,
	editMiddleware,
} from '../middlewares';
import { getCategoryNames } from '../controller/category/getCategoryNames';

const router = express.Router();

router.get(
	'/getcategorys',
	// authMiddleware,
	// isRoleMiddleware(["admin"]),
	getCategorys
);

router.get('/getcategory/:id', getSingleCategory);
router.get('/getcategorynames', getCategoryNames);
router.get('/gethomecategory', getHomeCategory);
router.post(
	'/createcategory',
	authMiddleware,
	isRoleMiddleware(['admin']),
	createCategory
);
router.put('/editcategory', authMiddleware, editMiddleware, editCategory);
router.delete(
	'/deletecategory',
	authMiddleware,
	isRoleMiddleware(['admin']),
	deleteCategory
);
export default router;
