import Comment from "../../model/comment";

export const dislikes = async (req, res, next) => {
  try {
    const id = req.body.id;

    const existingComment = await Comment.findById({ _id: id });
    //console.log("DISLIKES", existingComment.dislikes);

    var d = existingComment.dislikes;

    d++;

    const newComm = await Comment.findByIdAndUpdate(
      { _id: id },
      {
        dislikes: d
      }
    );

    return res.status(201).json({ newComm });
  } catch (error) {
    next(error);
  }
};
