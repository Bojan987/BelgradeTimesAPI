import { check } from 'express-validator';

//not working as intended
// const passwordRegex = new RegExp(
// 	/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/
// );

//* minimum 8 chars, at least 1 letter and 1 number
const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,30}$/);

const email = check('email', 'Invalid email.').not().isEmpty().isEmail();

const password = check('password', 'Password must be 8 characters long and contain at least 1 number.')
.not()
.isEmpty()
.isLength({ min: 8 })
.matches(passwordRegex)

const newPassword = check('newPassword', 'New password must be 8 characters long and contain at least 1 number.')
.not()
.isEmpty()
.isLength({ min: 8 })
.matches(passwordRegex)

const confirmPassword = check('confirmPassword', 'New password must be 8 characters long and contain at least 1 number.')
.not()
.isEmpty()
.isLength({ min: 8 })
// .matches(passwordRegex)

const firstName = check('firstName', 'Name is too short')
	.not()
	.isEmpty()
	.isLength({ min: 3 });

const emailEdit = check('email', 'Invalid email.').isEmail().optional();
const firstNameEdit = check('firstName', 'Name is too short')
	.isLength({ min: 3 })
	.optional();

const adminPassword = check('newPassword', 'Invalid password')
	.not()
	.isEmpty()
	.isLength({ min: 8 })
	.matches(passwordRegex);

export { email, password,newPassword,confirmPassword, firstName, emailEdit, firstNameEdit, adminPassword };
