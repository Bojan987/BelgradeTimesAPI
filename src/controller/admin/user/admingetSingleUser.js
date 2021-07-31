import User from "../../../model/user";
import Comment from "../../../model/comment";
import Post from "../../../model/post";

export const admingetSingleUser = async (req, res, next) => {
    try {

        const id = req.params.id;

        const user = await User.findById({ _id: id }).populate("bookmarks");
        const comments = await Comment.find({ author: id }).populate("postRelated", "title _id").select("content createdAt _id");
        const posts = await Post.find({ author: id });
        return res.status(201).json({ user, comments, posts });
    } catch (error) {
        next(error);
    }
};