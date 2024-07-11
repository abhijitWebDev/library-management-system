import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.models.js";

const adminCheck = async (req, res, next) => {
  try {
    // Fetch the user from the database to ensure the latest data
    const user = await User.findById(req.user._id);
    console.log(user);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isAdmin) {
      next();
    } else {
      throw new ApiError(403, "Access denied. Admins only.");
    }
  } catch (error) {
    next(error);
  }
};

export default adminCheck;
