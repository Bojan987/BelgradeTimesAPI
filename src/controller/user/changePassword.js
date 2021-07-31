import User from "../../model/user";
import bcrypt from "bcryptjs";

export const changePassword = async (req, res, next) => {
  try {
    const existingUser = await User.findById({ _id: req.userId });
    const { password, newPassword, confirmPassword } = req.body;
    
    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) {
      throw new Error("Wrong Password");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("New requested passwords do not match");
    }

    const brandNewPass = await bcrypt.hash(newPassword, 12);

    if (!brandNewPass) {
      throw new Error("brand new pass Error");
    }

    await User.findByIdAndUpdate(
      {
        _id: req.userId
      },
      {
        password: brandNewPass
      }
    );
    return res.status(201).json({ message: "Password changed successfully!" });
  } catch (error) {
    next(error);
  }
};
