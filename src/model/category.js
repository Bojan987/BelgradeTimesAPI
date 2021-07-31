import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    layout: {
      type: Schema.Types.ObjectId,
      ref: "Layout"
    },

    home: {
      type: Boolean,
      default: false
    },

    homeOrder: {
      type: Number,
      default: false
    },

    sidebar: {
      type: Boolean
    },

    numOfPosts: {
      type: Number,
      default: 0
    },

    sidebarType: {
      type: String
    },

    primaryPosts: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
