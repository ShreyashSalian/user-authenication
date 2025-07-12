import express from "express";
import { CONSTANT_LIST } from "../constants/global-constant";
import userRoute from "./user.route";
import authRoute from "./auth.route";

const indexRoute = express.Router();
indexRoute.use("/api/v1/users", userRoute);
indexRoute.use("/api/v1/auth", authRoute);

indexRoute.get(
  "/api/v1",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res
      .status(CONSTANT_LIST.STATUS_CODE_OK)
      .json({ message: CONSTANT_LIST.SERVER_RUNNING_GOOD });
  }
);

export default indexRoute;
