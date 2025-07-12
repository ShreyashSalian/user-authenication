import express from "express";
import { verifyUser } from "../middlewares/user.middleware";
import { addNewUser, getLoginUserDetail } from "../controllers/user.controller";

import { validateAPI } from "../middlewares/validation.middleware";
import { userValidation } from "../validations/register.validation";
const userRoute = express.Router();

userRoute.get("/", verifyUser, getLoginUserDetail);
userRoute.post("/", userValidation(), validateAPI, addNewUser);

export default userRoute;
