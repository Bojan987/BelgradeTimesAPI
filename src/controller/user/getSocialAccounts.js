import User from "../../model/user";

export const getSocialAccounts = async (req, res, next) => {
    const id = req.userId;

    try {
        const existingUser = await User.findById({ _id: id });
        const socAcc = existingUser.socialAccounts;
        return res.status(201).json({ socAcc });
    } catch (error) {
        next(error);
    }
}; 