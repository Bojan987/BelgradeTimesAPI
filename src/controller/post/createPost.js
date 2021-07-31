import Post from "../../model/post";
import Category from "../../model/category";
require("dotenv").config();

const { ENV } = process.env;

export const createPost = async (req, res, next) => {
  try {
    const cat = await Category.findById({ _id: req.body.category });
    const numOfPrimary = cat.primaryPosts;
    const numOfPosts = cat.numOfPosts;
    const number = numOfPosts + 1;
	
	console.log(req)

    // const image =
     // ENV === "DEV"
        // ? "localhost:3000/posts/" + req.file.filename
        // : "https://news.thinksmart.rs/api/posts/" +
        // req.file.filename;


    if (req.body.primary === true) {
      if (numOfPrimary === 3) {
        const post = new Post({
          ...req.body,
          primary: false,
          author: req.userId,
          // image
        });

        await post.save();
        await Category.findByIdAndUpdate(
          { _id: req.body.category },
          { numOfPosts: number }
        );

        return res
          .status(201)
          .json({ message: "Post is created but can not be primary" });
      }

      const post = new Post({
        ...req.body,
        author: req.userId,
        // image
      });

      await post.save();
      const newNum = numOfPrimary + 1;
      await Category.findByIdAndUpdate(
        { _id: req.body.category },
        { primaryPosts: newNum, numOfPosts: number }
      );
      return res.status(201).json({
        message: "Post created"
      });
    }

    const post = new Post({
      ...req.body,
      author: req.userId,
      // image
    });

    await post.save();
    await Category.findByIdAndUpdate(
      { _id: req.body.category },
      { numOfPosts: number }
    );
    return res.status(201).json({
      message: "Post created"
    });
  } catch (error) {
    next(error);
  }
};
