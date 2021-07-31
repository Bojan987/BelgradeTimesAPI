import Comment from "../../model/comment";
import Post from "../../model/post";

export const createComment = async (req, res, next) => {
  try {
    const { content, notifyAuthor, postId } = req.body;

    const comment = new Comment({
      content,
      notifyAuthor,
      author: req.userId,
      postRelated: postId
    });

    const ruzneReci = [];

    const bad = ["materinu", "marš", "genitalije", "jebem"];
    for (let i = 0; i < bad.length - 1; i++) {
      ruzneReci.push(bad[i].normalize("NFC"));
    }

    for (let i = 0; i < ruzneReci.length; i++) {
      if (content.includes(ruzneReci[i])) {
        console.log(ruzneReci[i]);
        throw new Error("MNOGO PSUJES");
      }
    }

    const post = await Post.findById({ _id: comment.postRelated });

    if (post.hasComments) {
      await comment.save();
      post.numOfComments += 1;
      await post.save();
      return res.status(201).json({ message: "Comment successfully created" });
    } else {
      await comment.save();
      post.hasComments = true;
      post.numOfComments += 1;
      await post.save();
      return res.status(201).json({ message: "Comment successfully created" });
    }
  } catch (error) {
    next(error);
  }
};
