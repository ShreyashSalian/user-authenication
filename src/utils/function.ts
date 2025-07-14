import express from "express";

export function asyncHandler<
  P = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
>(
  fn: (
    req: express.Request<ResBody, ReqBody, ReqQuery>,
    res: express.Response<ResBody>,
    next: express.NextFunction
  ) => Promise<any>
) {
  return (
    req: express.Request<ResBody, ReqBody, ReqQuery>,
    res: express.Response<ResBody>,
    next: express.NextFunction
  ) => Promise.resolve(fn(req, res, next)).catch(next);
}

export const sendSuccess = (
  res: express.Response,
  status: number,
  statusCode: number,
  message: string,
  data: any
) => {
  return res.status(statusCode).json({
    status,
    statusCode,
    data,
    successMessage: message,
    errorMessage: null,
  });
};

export const sendError = (
  res: express.Response,
  status: number,
  statusCode: number,
  error: string
) => {
  return res.status(statusCode).json({
    status,
    statusCode,
    data: null,
    successMessage: null,
    errorMessage: error,
  });
};

export const trimInput = (val: string) => {
  if (typeof val === "string") {
    return val.trim();
  } else {
    return val;
  }
};

export const convertToUpperCase = (name: string) => {
  const char = name.split(" ");
  for (let i = 0; i < char.length; i++) {
    char[i] = char[i].charAt(0).toUpperCase() + char[i].slice(1);
  }
  return char.join(" ");
};
