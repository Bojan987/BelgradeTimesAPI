import Post from "../../model/post";
import User from "../../model/user";

export const deletePost = async (req, res, next) => {
  try {
    const existingPost = await Post.findById({ _id: req.body.id });

    if (existingPost) {
      const autor = existingPost.author;
      const user = await User.findById({ _id: req.userId });

      if (user.role == "admin") {
        await existingPost.remove();
        return res.status(201).json({ message: "Post deleted" });
      }

      if (autor == req.userId) {
        await existingPost.remove();
        return res.status(201).json({ message: "Post deleted" });
      }

      throw new Error(
        "Action denied, you need to be either ADMIN or AUTHOR of the post to have permission to delete it"
      );
    }
    throw new Error('Post does not exist');

  } catch (err) {
    next(err);
  }
};
