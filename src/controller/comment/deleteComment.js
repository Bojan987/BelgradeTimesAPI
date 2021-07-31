import Comment from '../../model/comment';
import User from "../../model/user";
export const deleteComment = async (req, res, next) => {
    console.log(req.body,req.userId )
    try {
        const user = await User.findById({ _id: req.userId })
        console.log(user)
        const existingComment = await Comment.findById({ _id: req.body.id });
        if (existingComment.author == req.userId || user.role == 'admin') {
            existingComment.remove();
            return res.status(201).json({ message: "Comment successfully deleted" });
        }
        throw new Error('You are not author of the comment nor admin');
    } catch (error) {
        next(error);
    }
};