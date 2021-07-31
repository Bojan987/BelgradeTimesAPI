import User from "../../model/user";
import bcrypt from "bcryptjs";

export const disableAccount = async (req, res, next) => {
  try {
    const existingUser = await User.findById({ _id: req.userId });
    const { leavingReason, currentPass, confirmPass } = req.body;

    const match = await bcrypt.compare(currentPass, existingUser.password);

    if (!match) {
      throw new Error("Wrong Password");
    }

    if (currentPass !== confirmPass) {
      throw new Error("Confirming Password does not match");
    }

    await User.findByIdAndUpdate(
      { _id: req.userId },
      { accountStatus: "disabled", leavingReason: leavingReason }
    );

    return res.status(201).json({ message: "Account successfully disabled" });
  } catch (err) {
    next(err);
  }
};
