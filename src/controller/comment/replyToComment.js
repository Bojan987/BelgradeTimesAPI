import Comment from "../../model/comment";

export const replyToComment = async (req, res, next) => {
  try {
    const { idComment, content } = req.body;
    const existingComment = await Comment.findById({ _id: idComment });
    const existingReplies = existingComment.replies;

    const reply = {
      author: req.userId,
      content
    };

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

    if (!existingReplies || existingReplies.length === 0) {
      const replies = [];
      replies.push(reply);

      await Comment.findByIdAndUpdate({ _id: idComment }, { replies: replies });
      return res.status(201).json({ message: "You replied successfully" });
    }

    existingReplies.push(reply);
    await Comment.findByIdAndUpdate(
      { _id: idComment },
      { replies: existingReplies }
    );
    return res.status(201).json({ message: "You replied successfully" });
  } catch (error) {
    next(error);
  }
};
