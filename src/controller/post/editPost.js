import Post from "../../model/post";
import Category from "../../model/category";

export const editPost = async (req, res, next) => {
  try {
    const { primary, postId } = req.body;

    const post = await Post.findById({ _id: postId });
    const Cat = post.category;
    const cat = await Category.findById({ _id: Cat });

    const numOfPrimary = cat.primaryPosts;
    const newNumOfPrimary = numOfPrimary + 1;

    if (primary === true) {
      if (numOfPrimary === 3) {
        await Post.findByIdAndUpdate(
          {
            _id: postId
          },
          {
            ...req.body,
            primary: false
          }
        );

        return res.status(201).json({ message: "Post edited succsessfully but can not be primary!" });
      }
      await Post.findByIdAndUpdate(
        {
          _id: postId
        },
        {
          ...req.body
        }
      );

      await Category.findByIdAndUpdate({ _id: Cat }, { primaryPosts: newNumOfPrimary });

      return res.status(201).json({ message: "Post edited succsessfully!" });
    }

    await Post.findByIdAndUpdate(
      {
        _id: postId
      },
      {
        ...req.body
      });
    return res.status(201).json({ message: "Post edited succsessfully!" });
  }

  catch (err) {
    next(err);
  }
};
