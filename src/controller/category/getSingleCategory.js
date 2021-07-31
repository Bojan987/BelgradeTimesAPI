import category from "../../model/category";

export const getSingleCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const singleCategory = await category
      .findById({ _id: id })
      .populate("author", "firstName _id avatar role")
      .populate("layout", "_id name");
    return res.status(201).json({ singleCategory });
  } catch (error) {
    next(error);
  }
};
