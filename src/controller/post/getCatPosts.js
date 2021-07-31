import Post from "../../model/post";
import Category from "../../model/category";
import Comment from "../../model/comment";

export const getCatPosts = async (req, res, next) => {
  const { page, visits, latest, byComments, limit } = req.query;
  const id = req.query.categoryId;
  var tempID = "";

  const sortVisits = visits === "" || !visits ? {} : { visits: -1 };
  const sortLatest = latest === "" || !latest ? {} : { createdAt: -1 };
  const sortComments =
    byComments === "" || !byComments ? {} : { numOfComments: -1 };

  try {
    const catObj = await Category.find();
    var cast = {};

    for (let i = 0; i < catObj.length; i++) {
      cast[catObj[i].name] = catObj[i]._id;
    }

    var spidarability = Object.keys(cast).map(function(key) {
      return [String(key), cast[key]];
    });

    //console.log(spidarability[1]);
    //console.log(spidarability[1][0]);
    let exist = false;

    for (let i = 0; i < spidarability.length; i++) {
      //console.log(spidarability[i][0], spidarability[i][1]);
      if (id === spidarability[i][0]) {
        exist = true;
        tempID = spidarability[i][1];
        //console.log(tempID);
      }
    }

    // ALL
    const sumOfPosts = await Post.countDocuments();
    console.log(sumOfPosts);

    const post = await Post.find()
      .populate("author", "firstName lastName ")
      .populate("category", "name")
      .sort(sortLatest)
      .sort(sortVisits)
      .sort(sortComments)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (id === "all") {
      exist = true;
      return res.status(201).json(post);
    }
    if (!exist) {
      throw new Error("Non existing category");
    }

    // CATEGORY
    const sumOfCatPosts = await Post.countDocuments({ category: tempID });
    console.log(sumOfCatPosts);
    const cats = await Post.find({ category: tempID })
      .populate("author", "firstName lastName ")
      .populate("category", "name")
      .sort(sortLatest)
      .sort(sortVisits)
      .sort(sortComments)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (cats.length > 0) {
      return res.status(201).json({ cats });
    }

    return res.status(201).json("No matching posts");
  } catch (error) {
    next(error);
  }
};
