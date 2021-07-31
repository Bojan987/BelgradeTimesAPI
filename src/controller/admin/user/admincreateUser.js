import User from "../../../model/user";
import bcrypt from "bcryptjs";
import multer from "multer";
require("dotenv").config();

const { ENV } = process.env;

export const admincreateUser = async (req, res, next) => {
  //const image = req.file;

  /*  const avatar =
    ENV === "DEV"
      ? "localhost:3000/avatars/" + req.file.filename
      : "https://news.thinksmart.rs/api/avatars/" +
      req.file.filename; */
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      accountStatus,
      description,
      country,
      city,
      address,
      phone,
      age,
      socialAccounts,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword)
      return res.status(403).json({ message: "Passwords do NOT match" });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email in use!");
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      accountStatus,
      description,
      country,
      city,
      address,
      phone,
      age,
      emailConfirmed: true,
      socialAccounts,
    });

    await user.save();

    return res.status(201).json({
      message: "User is created by admin",
    });
  } catch (error) {
    next(error);
  }
};
