import { validationResult, checkSchema } from 'express-validator';

export const validationMiddleware = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const extractedErrors = [];

		errors.array().map(err => extractedErrors.push(err.msg));
		console.log(errors);

		res.status(422).json({ errors: extractedErrors });
		return;
	}

	next();
};
