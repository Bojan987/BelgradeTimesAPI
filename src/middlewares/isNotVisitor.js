import User from "../model/user";

export const isNotVisitorMiddleware = async (req, res, next) => {
    const id = req.userId;
    const existingUser = User.findById({ _id: id });
    try {
        if (!existingUser) {
            throw new Error('User not found!');
        }

        if (existingUser.role === 'visitor') {
            throw new Error('Role is visitor');
        }
        return next();

    } catch (error) {
        next(error);
    }
};