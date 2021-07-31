import Comment from "../../model/comment";
import Post from "../../model/post";

export const deleteAllForPost = async (req, res, next) => {
    try {
        const postId = req.body.postId;
        const post = await Post.findById({ _id: postId });
        if (!post) {
            throw new Error("Post does not exist");
        }
        post.hasComments = false;
        post.numOfComments = 0;
        await post.save();

        await Comment.deleteMany({ postRelated: postId });
        return res.status(201).json({ "message": "Comments successfully deleted" });
    } catch (error) {
        next(error);
    }
}