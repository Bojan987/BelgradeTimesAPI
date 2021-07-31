import User from "../../model/user";
import Layout from "../../model/layout";
import Post from "../../model/post";

export const modelPicker = async (userId, name) => {
  let model;
  switch (name) {
    case "user":
      model = await User.findById(userId);
      break;
    case "layout":
      model = await Layout.findById(userId);
      break;
    case "post":
      model = await Post.findById(userId);
      break;

    default:
      break;
  }
  return model;
};
