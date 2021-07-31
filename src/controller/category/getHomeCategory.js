import Category from "../../model/category";

export const getHomeCategory = async (req, res, next) => {
  try {
    const homeCategories = await Category.find({ home: "true" })
      .populate("layout", "name _id")
      .select("home homeOrder numOfPosts _id name sidebar primaryPosts");
    return res.status(201).json({ homeCategories });
  } catch (error) {
    next(error);
  }
};
