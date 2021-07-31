import sgMail from "@sendgrid/mail";

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const resendConfCode = async (req, res, next) => {
  try {
    const emailCode = Math.floor(Math.random() * (999999 - 111111) + 111111);
    existingUser.emailCode = emailCode;
    await existingUser.save();

    const msg = {
      to: req.body.email,
      from: "development@thinksmarter.rs",
      subject: "Confirm your email with this code",
      html: emailCode
    };
    sgMail.send(msg);

    return res.status(201).json({
      message: "Confirmation code is sent again on your e-mail"
    });
  } catch (error) {
    next(error);
  }
};
