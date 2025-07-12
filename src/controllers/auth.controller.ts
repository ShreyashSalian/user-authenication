import express from "express";
import { asyncHandler, sendError, sendSuccess } from "../utils/function";
import { User } from "../models/user.model";
import { Login } from "../models/login.model";
import { LoginBody } from "../helpers/user.helper";
import { CONSTANT_LIST } from "../constants/global-constant";
import { USER_MESSAGE_LIST } from "../controller-messages/user.message";

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
          {
            email: { $regex: userNameOrEmail, $options: "i" },
          },
          {
            userName: userNameOrEmail,
          },
        ],
      });
      if (!checkUserExist) {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.NO_USER_FOUND,
          USER_MESSAGE_LIST.NO_USER_FOUND_WITH_EMAIL_OR_USERNAME
        );
      }
      if (checkUserExist.isDeleted) {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.BAD_REQUEST,
          USER_MESSAGE_LIST.ACCOUNT_DISABLED
        );
      }
      const passwordCheck = await checkUserExist.comparePassword(password);
      if (!passwordCheck) {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.BAD_REQUEST,
          USER_MESSAGE_LIST.ENTER_VALID_PASSWORD
        );
      }
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        checkUserExist?._id
      );

      await Login.create({
        userId: checkUserExist?._id,
        email: checkUserExist?.email,
        accessToken,
        refreshToken,
      });

      const loginUser = await User.findById(checkUserExist?._id).select(
        "-password"
      );
      return sendSuccess(
        res,
        CONSTANT_LIST.STATUS_SUCCESS,
        CONSTANT_LIST.STATUS_CODE_OK,
        USER_MESSAGE_LIST.LOGIN_USER_DETAIL,
        { loginUser, accessToken, refreshToken }
      );
    } catch (err: any) {
      console.log(err);
      return sendError(
        res,
        CONSTANT_LIST.STATUS_ERROR,
        500,
        "Internal server error"
      );
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
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.NO_USER_FOUND,
          USER_MESSAGE_LIST.NO_USER_FOUND_WITH_EMAIL_OR_USERNAME
        );
      }
      const deleteUserFromLogin = await Login.findOneAndDelete({
        userId: user,
      });
      if (deleteUserFromLogin) {
        return sendSuccess(
          res,
          CONSTANT_LIST.STATUS_SUCCESS,
          CONSTANT_LIST.STATUS_CODE_OK,
          USER_MESSAGE_LIST.USER_LOGOUT_SUCESSFULLY,
          {}
        );
      } else {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.BAD_REQUEST,
          USER_MESSAGE_LIST.USER_LOGOUT_FAIL
        );
      }
    } catch (err: any) {
      console.log(err);
      return sendError(
        res,
        CONSTANT_LIST.STATUS_ERROR,
        CONSTANT_LIST.INTERNAL_SERVER_ERROR,
        CONSTANT_LIST.INTERNAL_SERVER_ERROR_MESSAGE
      );
    }
  }
);
