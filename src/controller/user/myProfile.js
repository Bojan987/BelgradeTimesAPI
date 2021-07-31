import User from "../../model/user";
import Comment from "../../model/comment";

export const getMyProfile = async (req, res, next) => {
  try {
    const me = await User.findById({ _id: req.userId }).populate({
      path: "bookmarks",
      select: "title image createdAt _id",
      populate: { path: "author", select: "firstName" },
    });
    const myComments = await Comment.find({ author: req.userId })
      .populate("postRelated", "title _id")
      .select("content createdAt _id");
    return res.status(201).json({ me, myComments });
  } catch (error) {
    next(error);
  }
};
