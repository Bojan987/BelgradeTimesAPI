
import User from "../../model/user";
export const deleteBookmark = async (req, res, next) => {
    console.log( req.body.bookmarkId)
    try {
        const {bookmarkId,userId} = req.body
        const user = await User.findById(req.userId)
        
        if (req.userId === userId || user.role === 'admin') {
            await User.findOneAndUpdate({ _id:userId },{$pull:{bookmarks:bookmarkId}})
            
            
            return res.status(204).json({ message: "Bookmark deleted successfully" });
        }
        throw new Error('You are not author of the comment nor admin');
    } catch (error) {
        next(error);
    }
};