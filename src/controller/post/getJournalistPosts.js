import Post from "../../model/post";
import User from "../../model/user";

export const getJournalistPosts = async (req, res, next) => {
  try {
    // OLIVERIN KOD HEHE (:
    const { page, idAuthor } = req.query;
    console.log(idAuthor);

    const posts = await Post.find({ author: idAuthor }).select(
      "image title createdAt _id"
    );
    const author = await User.findById({ _id: idAuthor }).select(
      "description firstName lastName socialAccounts _id avatar "
    );
    if (!posts) return res.status(201).json({ author });

    posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    const preskoci = page == 1 ? 0 : (parseInt(page) - 1) * parseInt(12);
    const postsPaginated = posts.slice(preskoci, preskoci + 12);
    const numberOfPosts = posts.length;

    return res.status(201).json({ postsPaginated, numberOfPosts, author });
  } catch (error) {
    next(error);
  }
};
