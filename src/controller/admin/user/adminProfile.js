import User from "../../../model/user";

export const adminProfile = async (req, res, next) => {
    try {

        const admin = await User.findById({ _id: req.userId });
        return res.status(201).json(admin);

    } catch (error) {
        next(error);
    }
}