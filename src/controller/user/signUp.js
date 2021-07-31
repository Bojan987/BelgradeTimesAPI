import User from '../../model/user';
import bcrypt from 'bcryptjs';
//  import geoip from "geoip-country";
import sgMail from '@sendgrid/mail';
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const signUp = async (req, res, next) => {
	try {
		const { email, password, firstName, lastName, newsletter } = req.body;

		// const ip = req.ip;
		// const ipObject = geoip.lookup(ip);
		// const country = ipObject.country;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			if (existingUser.accountStatus === 'deleted') {
				throw new Error(
					'This account was deleted. Please use new email adress!'
				);
			}

			throw new Error('Email in use!');
		}

		const emailCode = Math.floor(Math.random() * (999999 - 111111) + 111111);
		const user = new User({
			firstName,
			email,
			password,
			resetCode: null,
			emailCode,
			country: 'RS',
			preferences: {
				newsNotification: newsletter || false,
				replyNotification: true,
			},
		});

		await user.save();

		const url = `${req.protocol}://${req.get(
			'host'
		)}/user/confirmEmail?email=${email}&emailCode=${emailCode}`;
		const msg = {
			to: email,
			from: 'bojanmaj123@hotmail.com',
			subject: 'Confirm your email with this code',
			template_id: 'd-b8f2570a3a61417492a757a4295a1757',
			dynamic_template_data: { code: url },
			// text: url,
		};
		sgMail.send(msg);

		return res.status(201).json({
			message:
				'User is created and confirmation code for e-mail sent successfully',
		});
	} catch (error) {
		next(error);
	}
};
