import Comment from "../../model/comment";

export const editComment = async (req, res, next) => {
  try {
    const { idComment } = req.body;
    const existingComment = await Comment.findById({ _id: idComment });
    if (existingComment.author == req.userId) {
      await existingComment.update({ ...req.body });
      await existingComment.save();
      return res.status(201).json({ message: "Comment successfully edited" });
    }

    throw new Error("You are not author of the comment");
  } catch (error) {
    next(error);
  }
};
