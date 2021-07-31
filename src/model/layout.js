import mongoose from "mongoose";
const Schema = mongoose.Schema;

const layoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: false
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Layout", layoutSchema);
