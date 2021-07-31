import jwt from 'jsonwebtoken';
require('dotenv').config();

const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		const error = new Error('Not authenticated.');
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, JWT_SECRET);
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
	if (!decodedToken) {
		const error = new Error('Not authenticated.');
		error.statusCode = 401;
		throw error;
	}

	req.userId = decodedToken.id;
	next();
};

export { authMiddleware };
