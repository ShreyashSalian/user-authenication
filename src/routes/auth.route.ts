import express from "express";
import { loginValidation } from "../validations/login.validation";
import { validateAPI } from "../middlewares/validation.middleware";
import { loginUser, logoutUser } from "../controllers/auth.controller";
import { verifyUser } from "../middlewares/user.middleware";

const authRoute = express.Router();

authRoute.post("/login", loginValidation(), validateAPI, loginUser);
authRoute.get("/logout", verifyUser, logoutUser);

export default authRoute;
