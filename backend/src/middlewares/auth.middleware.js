import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try{
    const token =
    req.cookies?.accessToken ||
    req.headers("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  

  const user = await User.findById(decodedToken?.id).select(
    "-password -refreshToken"
  );
  

  if (!user) {
    // Todo discuss with frontend team
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;
  next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized");
  }
});
