import User from "../../model/user";

export const deleteSocialAccount = async (req, res, next) => {

    try {
        const {name} = req.body;
        const id = req.userId;
        const existingUser = await User.findById({ _id: id });
        const userSocialAccounts = existingUser.socialAccounts;

        const len = userSocialAccounts.length;
        console.log(len);
        for (var i = 0; i < len; i++) {
            if (userSocialAccounts[i].name === name) {
                userSocialAccounts.splice(i, 1);
                const newUserAccounts = await User.findByIdAndUpdate({ _id: req.userId }, { socialAccounts: userSocialAccounts });
                return res.status(201).json({ newUserAccounts });
            }
        }

        throw new Error("You don't have that account");



    } catch (error) {
        next(error);
    }

};