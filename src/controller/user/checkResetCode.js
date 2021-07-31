import User from "../../model/user";

export const checkResetCode = async (req, res, next) => {
    try {
        const email = req.body.email;
        const resetCode = req.body.resetCode;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("Greska");
        }

        if (resetCode !== existingUser.resetCode) {
            throw new Error("You entered a wrong code !");
        }

        return res.status(201).json({ message: "Codes match" });
    } catch (error) {
        next(error);
    }
};