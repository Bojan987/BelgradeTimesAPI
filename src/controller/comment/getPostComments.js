import Post from "../../model/post";
import Comment from "../../model/comment";

export const getPostComments = async (req, res, next) => {

  const { page, limit, postId } = req.query;

  try {
    const existingPost = await Post.findById({
      _id: postId
    });

    const allComments = await Comment.find({ postRelated: existingPost.id });
    const nummOfComm = allComments.length;

    const comments = await Comment.find({
      postRelated: existingPost.id
    }).limit(parseInt(limit)).skip(page == 1 ? 0 : (parseInt(page) - 1) * parseInt(limit))
      .populate("author", "avatar firstName lastName socialACcounts _id")
      .populate("replies.author");
    return res.status(201).json({ comments, nummOfComm });
  } catch (error) {
    next(error);
  }
};
