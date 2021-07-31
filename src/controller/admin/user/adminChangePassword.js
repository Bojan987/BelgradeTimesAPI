import User from "../../../model/user.js";
import bcrypt from "bcryptjs";
export const adminChangePassword = async (req, res, next) => {
  try {
    const { newPassword, newPasswordAgain } = req.body;

    if (newPassword !== newPasswordAgain) {
      throw new Error("New passwords do not match");
    }

    const pass = await bcrypt.hash(newPassword, 12);
    if (!pass) {
      throw new Error("Error with new password");
    }

    await User.findByIdAndUpdate({ _id: req.params.id }, { password: pass });

    return res
      .status(201)
      .json({ message: "Password changed successfully by admin!" });
  } catch (error) {
    next(error);
  }
};
