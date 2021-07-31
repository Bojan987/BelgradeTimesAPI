import Category from "../../model/category";
import User from "../../model/user";

export const editCategory = async (req, res, next) => {
  const { id } = req.body;

  try {
    const editCategory = await Category.findById({ _id: id });
    const autorCategoryId = editCategory.author;
    const user = await User.findById({ _id: req.userId });

    if (autorCategoryId == req.userId || user.role == "admin") {
      await Category.findByIdAndUpdate({ _id: id }, { ...req.body });
      return res.status(201).json({ message: "Category edited successfully" });
    }

    throw new Error("You are not creator of the category nor admin");
  } catch (error) {
    next(error);
  }
};
