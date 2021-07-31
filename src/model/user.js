import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			default: 'anonymous',
		},
		lastName: {
			type: String,
			default: 'anonymous',
		},

		email: {
			type: String,
			required: true,
			unique: true,
		},

		password: {
			type: String,
			required: true,
		},

		resetCode: {
			type: Number,
			required: false,
		},

		emailCode: {
			type: Number,
			default: null,
		},

		emailConfirmed: {
			type: Boolean,

			default: false,
		},

		role: {
			type: String,
			enum: ['visitor', 'journalist', 'manager', 'admin'],
			default: 'visitor',
		},

		image: {
			type: String,
		},

		description: {
			type: String,
		},

		country: {
			type: String,
			required: false,
		},

		city: {
			type: String,
			required: false,
		},

		address: {
			type: String,
			required: false,
		},

		phone: {
			type: String,
			required: false,
		},

		gender: {
			type: String,
			required: false,
		},

		age: {
			type: Number,
			required: false,
		},

		lastLogin: {
			type: Date,
			default: null,
		},

		lastIpAddress: {
			type: String,
			default: null,
		},

		accountStatus: {
			type: String,
			enum: ['inactive', 'active', 'blocked', 'deleted'],
			default: 'inactive',
		},

		leavingReason: {
			type: String,
		},

		socialAccounts: [
			{
				name: String,
				link: String,
			},
		],
		bookmarks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Post',
			},
		],

		position: {
			type: String,
		},

		preferences: {
			newsNotification: Boolean,
			replyNotification: Boolean,
		},

		token: String,

		tokenExpires: String,
	},
	{ timestamps: true, toJSON: { vrituals: true }, toObject: { virtuals: true } }
);

userSchema.methods.toJSON = function () {
	const user = this.toObject();

	delete user.__v;
	delete user.id;
	delete user.password;
	delete user.preferences;
	delete user.emailCode;
	delete user.resetCode;
	delete user.token;
	return user;
};

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password' || user.isNew)) {
		user.password = await bcrypt.hash(user.password, 12);
	}
	next();
});

export default mongoose.model('User', userSchema);
