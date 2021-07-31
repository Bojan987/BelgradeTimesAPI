import Post from "../../model/post";

export const canBeMain = async (req, res, next) => {

    try {
        const mainPost = await Post.findOne({ main: true }).populate("category author").select("title content _id");
        if (mainPost) {
            return res.status(201).json(false)
        }

        return res.status(201).json(true);
    } catch (error) {
        next(error);
    }


};