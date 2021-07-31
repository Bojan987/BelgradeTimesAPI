import Category from "../../model/category";
import User from "../../model/user";

export const deleteCategory = async (req, res, next) => {
  try {
    const categoryForDelete = await Category.findById({ _id: req.body.id });
    if (categoryForDelete) {
      const user = await User.findById({ _id: req.userId });
      if (categoryForDelete.author == req.userId || user.role == "admin") {
        await categoryForDelete.remove();
        return res
          .status(201)
          .json({ message: "Category deleted successfully" });
      }
      throw new Error("You don't have permission to delete category");
    }
    throw new Error("Category does not exist");
  } catch (error) {
    next(error);
  }
};
