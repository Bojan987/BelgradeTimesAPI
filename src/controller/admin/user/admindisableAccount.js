import User from "../../../model/user";

export const admindisableAccount = async (req, res, next) => {
    try {
        const id = req.body.id;

        await User.findOneAndUpdate({ _id: id }, { accountStatus: "disabled" });

        return res.status(201).json({ message: "Account disabled by admin" });
    } catch (err) {
        next(err);
    }
};