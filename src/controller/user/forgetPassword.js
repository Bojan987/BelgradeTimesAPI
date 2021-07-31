import User from "../../model/user";

import sgMail from "@sendgrid/mail";

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("Non existing user");
    }

    const resetCode = Math.floor(Math.random() * (999999 - 111111) + 111111);
    existingUser.resetCode = resetCode;
    await existingUser.save();

    const msg = {
			to: email,
			from: 'bojanmaj123@hotmail.com',
			subject: 'Confirm your email with this code',
			template_id:"d-d81e638b8d8c40cdb72fff38b6aead81",
			dynamic_template_data:{otp:resetCode},
			// text: url,
		};
    sgMail.send(msg);

    return res.status(201).json({ message: "Mail sent !" });
  } catch (error) {
    next(error);
  }
};
