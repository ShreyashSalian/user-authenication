import express from "express";
import { asyncHandler, sendError, sendSuccess } from "../utils/function";
import { User } from "../models/user.model";
import { CONSTANT_LIST } from "../constants/global-constant";
import { USER_MESSAGE_LIST } from "../controller-messages/user.message";
import { UserBody } from "../helpers/user.helper";
import { registrationMail } from "../utils/sendEmail";

export const getLoginUserDetail = asyncHandler(
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const user = req.user?.userId;
      const userDetail = await User.findById(user).select("-password");
      if (userDetail) {
        return sendSuccess(
          res,
          CONSTANT_LIST.STATUS_SUCCESS,
          CONSTANT_LIST.STATUS_CODE_OK,
          USER_MESSAGE_LIST.LOGIN_USER_DETAIL,
          userDetail
        );
      } else {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.BAD_REQUEST,
          USER_MESSAGE_LIST.NO_USER_FOUND
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

export const addNewUser = asyncHandler(
  async (
    req: express.Request<{}, {}, UserBody>,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const { email, userName, password, contactNumber, fullName, gender } =
        req.body;

      const checkUserExist = await User.findOne({
        $or: [
          {
            email: email,
          },
          {
            userName: userName,
          },
        ],
      });
      if (checkUserExist) {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.BAD_REQUEST,
          USER_MESSAGE_LIST.USER_CREATED_WITH_GIVEN_EMAIL_OR_USERNAME
        );
      }

      const userCreation = await User.create({
        email,
        userName,
        password,
        contactNumber,
        fullName,
        gender,
        status: "inactive",
        role: "user",
      });

      await registrationMail(email, fullName);

      const userDetail = await User.findById(userCreation?._id).select(
        "-password"
      );
      if (userCreation) {
        return sendSuccess(
          res,
          CONSTANT_LIST.STATUS_SUCCESS,
          CONSTANT_LIST.STATUS_CODE_OK,
          USER_MESSAGE_LIST.USER_ADDED,
          userDetail
        );
      } else {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.BAD_REQUEST,
          USER_MESSAGE_LIST.USER_NOT_ADDED
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
