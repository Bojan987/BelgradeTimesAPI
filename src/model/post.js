import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			required: false,
		},

		imageKey: {
			type: String,
			required: false,
		},

		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},

		content: {
			type: String,
			required: true,
		},

		visits: {
			type: Number,
			default: 0,
		},

		tags: {
			type: Array,
			default: [],
		},

		main: {
			type: Boolean,
			default: false,
		},

		primary: {
			type: Boolean,
			default: false,
		},

		light: {
			type: Boolean,
			default: false,
		},

		hasComments: {
			type: Boolean,
			default: false,
		},

		numOfComments: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);
//* check the tags index
postSchema.index({ title: 'text' });

export default mongoose.model('Post', postSchema);
