import User from "../model/user";

const isRoleMiddleware = (roles) => {
  return async (req, res, next) => {
    const id = req.userId;
    try {
      const existingUser = await User.findById({ _id: id });
      if (!existingUser) {
        throw new Error("Not authorized!");
      }

      if (roles.includes(existingUser.role)) {
        return next();
      }

      throw new Error("Not authorized!");
    } catch (error) {
      next(error);
    }
  };
};

export { isRoleMiddleware };
