import User from "../../../model/user";

export const admineditUserInfo = async (req, res, next) => {
  let user;

  try {
    user = await User.findById(req.params.id);
  } catch (error) {
    return res.status(403).json({ message: "Error fetching the user" });
  }

  if (!user) return res.status(404).json({ message: "User not found" });

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.accountStatus = req.body.accountStatus;
  user.role = req.body.role;
  user.position = req.body.position;
  user.country = req.body.country;
  user.city = req.body.city;
  user.address = req.body.address;
  user.phone = req.body.phone;
  user.age = req.body.age;

  try {
    await user.save();
  } catch (error) {
    return res.status(403).json({ message: "Error saving the user" });
  }

  return res.status(200).json({ message: "User successfuly edited by admin" });
};
