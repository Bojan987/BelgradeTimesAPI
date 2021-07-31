import User from "../../model/user";
import Post from "../../model/post";

export const getJournalistProfile = async (req, res, next) => {

    try {
        const id = req.params.id;
        const existingJournalist = await User.findById({ _id: id });

        if (existingJournalist.role != 'journalist') {
            throw new Error('User is not journalist');
        }
        const journalistsPosts = await Post.find({ author: id });

        return res.status(201).json({ existingJournalist, journalistsPosts });

    } catch (error) {
        next(error);
    }
};