import User from "../../../model/user";

export const adminEditSocial = async (req, res, next) => {
  const { socialAccounts } = req.body;
  let user;
  console.log(req.params.id);
  try {
    user = await User.findById(req.params.id);
  } catch (err) {
    return res.status(403).json({ message: "Error fetching the user" });
  }

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.socialAccounts = socialAccounts;
  try {
    await user.save();
  } catch (err) {
    return res.status(403).json({ message: "Error saving the user" });
  }

  user = await User.findById(req.params.id);
  return res
    .status(200)
    .json({ message: "Social accounts edited successfully!", user: user });
};
