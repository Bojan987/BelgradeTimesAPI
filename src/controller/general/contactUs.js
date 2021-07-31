import sgMail from "@sendgrid/mail";
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const contactUs = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const msg = {
      to: "development@thinksmarter.rs",
      from: email,
      subject: name,
      text: message
    };
    sgMail.send(msg);

    return res.status(201).json("E-mail sent successfully");
  } catch (error) {
    next(error);
  }
};
