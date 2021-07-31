import Comment from "../../model/comment";

export const likes = async (req, res, next) => {
  try {
    const id = req.body.id;

    const existingComment = await Comment.findById({ _id: id });

    var l = existingComment.likes;

    l++;

    const newComm = await Comment.findByIdAndUpdate(
      { _id: id },
      {
        likes: l
      }
    );

    return res.status(201).json({ newComm });
  } catch (error) {
    next(error);
  }
};
