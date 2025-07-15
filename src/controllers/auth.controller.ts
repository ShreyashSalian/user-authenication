import express from "express";
import { asyncHandler, sendError, sendSuccess } from "../utils/function";
import { User } from "../models/user.model";
import { Login } from "../models/login.model";
import { LoginBody } from "../helpers/user.helper";

const generateAccessAndRefreshToken = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("No user Found");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  return { accessToken, refreshToken };
};

export const loginUser = asyncHandler(
  async (
    req: express.Request<{}, {}, LoginBody>,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const { userNameOrEmail, password } = req.body;

      const checkUserExist = await User.findOne({
        $or: [
          { email: { $regex: userNameOrEmail, $options: "i" } },
          { userName: userNameOrEmail },
        ],
      });

      if (!checkUserExist) {
        return sendError(res, 0, 404, "User not found");
      }

      if (checkUserExist.isDeleted) {
        return sendError(res, 0, 400, "Account is disabled");
      }

      const passwordCheck = await checkUserExist.comparePassword(password);
      if (!passwordCheck) {
        return sendError(res, 0, 400, "Invalid password");
      }

      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        checkUserExist._id
      );

      await Login.create({
        userId: checkUserExist._id,
        email: checkUserExist.email,
        accessToken,
        refreshToken,
      });

      const loginUser = await User.findById(checkUserExist._id).select(
        "-password"
      );

      return sendSuccess(res, 1, 200, "User logged in successfully", {
        loginUser,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      console.log(err);
      return sendError(res, 0, 500, "Internal server error");
    }
  }
);

export const logoutUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const user = req.user?.userId;
      if (!user) {
        return sendError(res, 0, 404, "User not found");
      }

      const deleted = await Login.findOneAndDelete({ userId: user });

      if (deleted) {
        return sendSuccess(res, 1, 200, "User logged out successfully", {});
      } else {
        return sendError(res, 0, 400, "Logout failed");
      }
    } catch (err) {
      console.log(err);
      return sendError(res, 0, 500, "Internal server error");
    }
  }
);
