import Post from "../../model/post";

export const isPostLight = async (req, res, next) => {
    const idPost = req.params.idPost;

    const post = await Post.findById({ _id: idPost });
    if (!post)
        throw new Error('Post does not exist');
    const isLight = post.light;
    return res.status(201).json(isLight);

};