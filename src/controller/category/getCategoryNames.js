import Category from "../../model/category";

export const getCategoryNames = async (req, res, next) => {
  try {
    const categorys = await Category.find().select("name");

    return res.status(200).json({ categorys });
  } catch (error) {
    next(error);
  }
};
