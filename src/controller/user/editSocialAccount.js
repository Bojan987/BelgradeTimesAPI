import User from "../../model/user";

export const editSocialAccount = async (req, res, next) => {
    try {
        const id = req.userId;
        const { link, name } = req.body;


        const existingUser = await User.findById({ _id: id });
        const userSocialAccounts = existingUser.socialAccounts;

        if (!userSocialAccounts || userSocialAccounts.length === 0) {
            throw new Error('U dont have social accounts!')
        }

        const updatedAcc = userSocialAccounts.map((currentSocAcc) => {
            if (currentSocAcc.name === name) {
                currentSocAcc.link = link;
            }

            return currentSocAcc
        });

        const newUserAccounts = await User.findByIdAndUpdate({ _id: id }, { socialAccounts: updatedAcc });
        return res.status(201).json({ message: "Social account edited successfully" });
    } catch (error) {
        next(error);
    }

};