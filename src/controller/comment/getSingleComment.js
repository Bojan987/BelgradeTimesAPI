import Comment from "../../model/comment";
import User from "../../model/user";

export const getSingleComment = async (req, res, next) => {
  try {
    const id = req.params.id;

    const existingComment = await Comment.findById({ _id: id });

    const autor = await User.findById({ _id: existingComment.author }).populate(
      "author",
      "email firstName lastName socialAccounts _id description avatar"
    );

    return res.status(201).json({ existingComment, autor });
  } catch (error) {
    next(error);
  }
};
