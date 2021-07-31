import User from "../../model/user";

export const setPreferences = async (req, res, next) => {
  try {
    const { newsNotifications, commentsNotification } = req.body;

    await User.findByIdAndUpdate(
      { _id: req.userId },
      {
        newsNotification: newsNotifications,
        replyNotification: commentsNotification
      }
    );

    return res.status(201).json({ message: "Preferences set successfully" });
  } catch (err) {
    next(err);
  }
};
