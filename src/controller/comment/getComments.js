import Comment from "../../model/comment";

export const getComments = async (req, res, next) => {

  const { page, limit } = req.query;
  try {
    const existingComments = await Comment.find().limit(parseInt(limit)).skip(page == 1 ? 0 : (parseInt(page) - 1) * parseInt(limit)).populate(
      "author",
      "email firstName lastName socialAccounts _id description avatar"
    );
    const numOfComm = existingComments.length;
    return res.status(201).json({ existingComments, numOfComm });
  } catch (error) {
    next(error);
  }
};
