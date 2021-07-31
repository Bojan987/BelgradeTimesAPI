import Post from "../../model/post";
import Category from "../../model/category";

export const canBePrimary = async (req, res, next) => {
  const idCat = req.params.idCategory;

  try {
    const category = await Category.findById({ _id: idCat });
    if (!category)
      throw new Error('Category does not exist');
    const numOfPrimary = category.primaryPosts;
    if (numOfPrimary >= 3) {
      return res.status(201).json(false);
    }

    return res.status(201).json(true);
  } catch (error) {
    next(error);
  }
};
