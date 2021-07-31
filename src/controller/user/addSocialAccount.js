import User from "../../model/user";

export const addSocialAccount = async (req, res, next) => {
  //const id = req.userId;
  const { name, link } = req.body;

  try {
    const existingUser = await User.findById({ _id: req.userId });
    const socialAccount = {
      name,
      link,
    };
    console.log(socialAccount);

    const userSocialAccounts = existingUser.socialAccounts;

    userSocialAccounts.forEach((account) => {
      if (account.name === name) {
        throw new Error("Social Account exists");
      }
    });

    if (!userSocialAccounts || userSocialAccounts.length === 0) {
      const userAccounts = [];

      if (socialAccount.name && socialAccount.link) {
        userAccounts.push(socialAccount);
        await User.findByIdAndUpdate(
          { _id: req.userId },
          { socialAccounts: userAccounts }
        );
        return res
          .status(201)
          .json({ message: "Social account added successfully" });
      } else throw new Error("Please provide url.");
    }

    if (socialAccount.name && socialAccount.link) {
    userSocialAccounts.push(socialAccount);
    await User.findByIdAndUpdate(
      { _id: req.userId },
      { socialAccounts: userSocialAccounts }
    );
    return res
      .status(201)
      .json({ message: "Social account added successfully" })} else throw new Error("Please provide url.");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
