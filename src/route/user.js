import express from 'express';

import {
	login,
	signUp,
	resendConfCode,
	confirmEmail,
	deleteAccount,
	disableAccount,
	editUser,
	checkResetCode,
	forgetPassword,
	resetPassword,
	changePassword,
	addSocialAccount,
	getSocialAccounts,
	editSocialAccount,
	deleteSocialAccount,
	setPreferences,
	getMyProfile,
	addBookmark,
	getJournalistProfile,
	getNewsLetter,
	getOurTeam,
	getJournalists
} from '../controller/user';

import {
	admincreateUser,
	admineditUserInfo,
	admindeleteAccount,
	admindisableAccount,
	adminGetUsers,
	admingetSingleUser,
	adminProfile,
	adminChangePassword,
	adminEditSocial,
} from '../controller/admin/user';

import {
	authMiddleware,
	editMiddleware,
	validationMiddleware,
	isRoleMiddleware,
} from '../middlewares';

import { userValidation, adminValidation } from '../validation';
import { uploadImage } from '../util/helpers';
import { deleteBookmark } from '../controller/user/deleteBookmark';

const upload = uploadImage('avatars');

const router = express.Router();

router.get('/getJournalists', getJournalists);
router.get('/getOurTeam', getOurTeam);
router.get('/getJournalistProfile/:id', getJournalistProfile);
router.post('/signUp', userValidation.signUp, validationMiddleware, signUp);
router.post('/login', login);
router.post('/reset', forgetPassword);
router.post('/check', checkResetCode);
router.post('/newPassword', userValidation.forgotPassword,validationMiddleware, resetPassword);
router.get('/confirmEmail', confirmEmail);
router.put('/addBookmark', authMiddleware, addBookmark);
router.post("/deleteBookmark", authMiddleware, deleteBookmark);
//profil-user
router.put('/profile/addSocialAccount', authMiddleware, addSocialAccount);
router.get('/profile/getSocialAccounts', authMiddleware, getSocialAccounts);
router.put('/profile/editSocialAccounts', authMiddleware, editSocialAccount);
router.delete(
	'/profile/deleteSocialAccount',
	authMiddleware,
	deleteSocialAccount
);

router.put(
	'/profile/changePassword',
	authMiddleware,
	userValidation.changePassword,
	validationMiddleware,
	changePassword
);
router.put('/profile/setPreferences', authMiddleware, setPreferences);
router.get('/profile/myProfile', authMiddleware, getMyProfile);

router.post('/profile/deleteAccount', authMiddleware, deleteAccount);
router.post('/profile/disableAccount', authMiddleware, disableAccount);
router.put(
	'/profile/editUser',
	authMiddleware,
	editMiddleware,
	userValidation.editUser,
	validationMiddleware,
	editUser
);
//router.put("/resendMail", resendConfCode);

//adminove rute
router.post(
	'/createUser',
	authMiddleware,
	isRoleMiddleware(['admin']),
	upload.single('user'),
	admincreateUser
);
router.put(
	'/editUser/:id',
	authMiddleware,
	isRoleMiddleware(['admin']),
	editMiddleware,
	userValidation.editUser,
	validationMiddleware,
	admineditUserInfo
);
router.delete(
	'/deleteAccount/:id',
	authMiddleware,
	isRoleMiddleware(['admin']),
	admindeleteAccount
);
router.post(
	'/disableAccount',
	authMiddleware,
	isRoleMiddleware(['admin']),
	admindisableAccount
);
router.get(
	'/users',
	authMiddleware,
	isRoleMiddleware(['admin', 'manager']),
	adminGetUsers
);
router.get(
	'/getSingleUser/:id',
	authMiddleware,
	isRoleMiddleware(['admin']),
	admingetSingleUser
);
router.post(
	'/changePassword/:id',
	authMiddleware,
	isRoleMiddleware(['admin']),
	adminValidation.adminChangePassword,
	validationMiddleware,
	adminChangePassword
);
router.put(
	'/editSocial/:id',
	authMiddleware,
	isRoleMiddleware(['admin']),
	validationMiddleware,
	adminEditSocial
);

router.get('/getSingleUserMilos/:id', admingetSingleUser);
router.get('/admin', authMiddleware, isRoleMiddleware(['admin']), adminProfile);

router.get('/newsletter', getNewsLetter);
export default router;
