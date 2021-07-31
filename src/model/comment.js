import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    content: {
      type: String,
      required: true
    },

    likes: {
      type: Number,
      required: true,
      default: 0
    },

    dislikes: {
      type: Number,
      required: true,
      default: 0
    },

    replies: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },

        content: {
          type: String
        }
      }
    ],

    notifyAuthor: {
      type: Boolean,
      default: false
    },

    postRelated: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Comment", commentSchema);
