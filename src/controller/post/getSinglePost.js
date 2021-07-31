import Post from "../../model/post";
import Comment from "../../model/comment";
import Category from "../../model/category";

export const getSinglePost = async (req, res, next) => {
  try {
    const existingPost = await Post.findById({
      _id: req.query.postId
    });

    if (!existingPost) {
      throw new Error("Post does not exist");
    }

    var brojPoseta = existingPost.visits;
    ++brojPoseta;

    const post = await Post.findByIdAndUpdate(
      { _id: req.query.postId },
      { visits: brojPoseta }
    )
      .populate(
        "author",
        "email firstName lastName socialAccounts _id description avatar role image" 
      )
      .populate("category", "name");

    //const comments = await Comment.find({ postRelated: req.query.postId });
    //const numOfComments = comments.length;
    return res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
};
