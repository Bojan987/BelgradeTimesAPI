import User from "../../model/user";
import sgMail from "@sendgrid/mail";
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const getNewsLetter = async (req, res, next) => {


    const users = await User.find({ newsletter: true });

    for (let i = 0; i < users.length; i++) {
        const email = users[i].email;

        const msg = {
            to: email,
            from: "development@thinksmarter.rs",
            subject: "Newsletter",
            text: "You have applied for our newsletter. Here's what's new: "
        };

        sgMail.send(msg);

    }
    return res.status(201).json({
        message: "News sent"
    });




};