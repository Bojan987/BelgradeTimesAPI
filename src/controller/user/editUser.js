import User from "../../model/user";

export const editUser = async (req, res, next) => {
  try {
    console.log(req.body)
    await User.findOneAndUpdate(
      {
        _id: req.userId
      },
      {
        ...req.body
      }
    );

    res.status(201).json({ message: "User edited succsessfully !" });
  } catch (err) {
    next(err);
  }
};
