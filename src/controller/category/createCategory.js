import Category from "../../model/category";

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, layout, homeOrder, home, sidebar } = req.body;

    const category = new Category({
      name,
      description,
      layout,
      homeOrder,
      author: req.userId,
      home,
      sidebar,
    });

    await category.save();

    return res.status(201).json({ message: "Category successfully created" });
  } catch (error) {
    next(error);
  }
};
