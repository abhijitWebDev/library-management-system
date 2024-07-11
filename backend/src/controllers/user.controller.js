import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken';

const registerUser = asyncHandler(async(req, res) => {
// populate the data or get user details from the request like username, email, password
  // check the validation of the data like username, email, password and confirm password match or not or not empty
  // check the user already exists or not, username, email should be unique
  //if available then send to cloudinary and get the url and save it to the user.
  // create user object, create entry in database. save the user to the database
  // remove password and refreshToken from the user object.
  // check for user creation and return the response with user object

  const {username, fullName, email, password, contactNo, isAdmin} = req.body;

  if (
    [username, fullName, password, email, contactNo].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with this username or email already exists");
  }

  const user = await User.create({
    fullName: fullName,
    email: email,
    username: username.toLowerCase(),
    password: password,
    contactNo: contactNo,
    isAdmin: isAdmin
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// generating token
const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
  
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generate refresh and access token"
      );
    }
  };

  const loginUser = asyncHandler(async (req, res) => {
    // get the username or email and password from the request body
    // check the username or email and password are not emptt
    // check the user exists or not
    // check the password is correct or not
    // generate access and refresh token
    // send the response with tokens in the cookies
  
    const { username, email, password } = req.body;
    // check the username or email and password are not empty
    if (!(username || email)) {
      throw new ApiError(400, "Username or email is required");
    }
    // check the user exists or not
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    // check the user exists or not
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    // check the password is not empty
    if (!password) {
      throw new ApiError(400, "Password is required");
    }
  
    // check the password is correct or not
    const isPasswordValid = await user.isPasswordCorrect(password);
    // is password valid
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }
  
    // generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
  
    const loggedinUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    // send the response with tokens in the cookies
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedinUser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully"
        )
      );
  });

  const logoutUser = asyncHandler(async (req, res) => {
    console.log("req.user", req.user.id);
    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  });
  
  const refreshAccessToken = asyncHandler(async (req, res) => {
    // get the refresh token from the request cookies
    const incommingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    // check the refresh token is not empty
    if (!incommingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }
    try {
      // verify the refresh token
      const decodedToken = jwt.verify(
        incommingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      // check the user exists or not
      const user = await User.findById(decodedToken.id);
      if (!user) {
        throw new ApiError(401, "Invalid request token");
      }
      // check the refresh token is valid or not
      if (user?.refreshToken !== incommingRefreshToken) {
        throw new ApiError(401, "Refresh token is expired or used");
      }
  
      // generate access and refresh token
      const options = {
        httpOnly: true,
        secure: true,
      };
  
      const { accessToken, newRefreshToken } =
        await generateAccessAndRefreshTokens(user._id);
  
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("newRefreshToken", newRefreshToken, options)
        .json(
          new ApiResponse(
            200,
            { accessToken, newRefreshToken },
            "Access token refreshed successfully"
          )
        );
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token");
    }
  });
  
  const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    const user = await User.findById(req.user?._id);
  
    const isPasswordCorrect = user.isPasswordCorrect(oldPassword);
  
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid password");
    }
  
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
  
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  });
  
  const getCurrentUser = asyncHandler(async (req, res) => {
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "User details fetched successfully"));
  });


  export {
    registerUser,
    loginUser,
    logoutUser,
    generateAccessAndRefreshTokens,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
  }
