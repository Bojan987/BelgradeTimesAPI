import express from 'express';

import {
	createLayout,
	deleteLayout,
	editLayout,
	getLayout,
	getLayouts,
} from '../controller/layout';

import {
	authMiddleware,
	isRoleMiddleware,
	editMiddleware,
} from '../middlewares';

import { uploadImage } from '../util/helpers';

const upload = uploadImage('/layouts');
const router = express.Router();

router.post(
	'/createLayout',
	authMiddleware,
	isRoleMiddleware(['admin']),
	upload.single('layout'),
	createLayout
);
router.put('/editLayout/:id', authMiddleware, editMiddleware, editLayout);
router.delete('/deleteLayout/:id', authMiddleware, deleteLayout);
router.get(
	'/getLayout/:layoutId',
	authMiddleware,
	isRoleMiddleware(['admin']),
	getLayout
);
router.get('/getLayouts', authMiddleware, getLayouts);

export default router;
