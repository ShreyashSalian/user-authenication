import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";
import { asyncHandler, sendError } from "../utils/function";
import { CONSTANT_LIST } from "../constants/global-constant";
import { USER_MESSAGE_LIST } from "../controller-messages/user.message";

export const verifyUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    try {
      const token: string | undefined =
        req.cookies.accessToken ||
        req.header("Authorization")?.replace("Bearer", "").trim();
      if (!token) {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.UNAUTHORIZED_REQUEST,
          USER_MESSAGE_LIST.UNAUTHORIZED_REQUEST
        );
      }
      const secretKey: string | undefined = process.env.ACCESS_TOKEN;
      if (!secretKey) {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.UNAUTHORIZED_REQUEST,
          USER_MESSAGE_LIST.UNAUTHORIZED_REQUEST
        );
      }

      const decodeToken = jwt.verify(token, secretKey) as JwtPayload;
      console.log(decodeToken);
      const userDetail = await Login.findOne({
        email: decodeToken?.email,
        userId: decodeToken?.userId,
        accessToken: token,
      });
      if (!userDetail) {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.UNAUTHORIZED_REQUEST,
          USER_MESSAGE_LIST.UNAUTHORIZED_REQUEST
        );
      } else {
        req.user = userDetail;
        next();
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

export const checkAdminUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    try {
      const user = req.user?.userId;
      if (!user)
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.UNAUTHORIZED_REQUEST,
          USER_MESSAGE_LIST.UNAUTHORIZED_REQUEST
        );
      const userFound = await User.findById(user);
      if (!userFound) {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.NO_USER_FOUND,
          USER_MESSAGE_LIST.NO_USER_FOUND_WITH_EMAIL_OR_USERNAME
        );
      }
      if (userFound?.role === "admin") {
        next();
      } else {
        return sendError(
          res,
          CONSTANT_LIST.STATUS_ERROR,
          CONSTANT_LIST.UNAUTHORIZED_REQUEST,
          USER_MESSAGE_LIST.UNAUTHORIZED_REQUEST
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
