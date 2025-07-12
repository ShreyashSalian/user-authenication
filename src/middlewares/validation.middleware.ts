import express from "express";
import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/function";
import { CONSTANT_LIST } from "../constants/global-constant";

export const validateAPI = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> | void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [key: string]: string } = {};
  errors
    .array({ onlyFirstError: true })
    .map((err: any) => (extractedErrors[err.path] = err.msg));

  const responsePayload = {
    status: CONSTANT_LIST.STATUS_ERROR,
    statusCode: CONSTANT_LIST.VALIDATION_ERROR,
    data: CONSTANT_LIST.NULL,
    successMessage: CONSTANT_LIST.NULL,
    errorMessage: extractedErrors,
  };
  res.status(CONSTANT_LIST.VALIDATION_ERROR).json(responsePayload);
  return;
};

export const validationFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> | void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [key: string]: string } = {};
  errors
    .array({ onlyFirstError: true })
    .map((err: any) => (extractedErrors[err.path] = err.msg));

  const responsePayload = {
    statusCode: 0,
    status: 417,
    data: null,
    successMessage: null,
    errorMessage: extractedErrors,
  };
  res.status(417).json(responsePayload);
  return;
};
