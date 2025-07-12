// src/app.ts
import express from "express";
import cookieParser from "cookie-parser";
import dotnev from "dotenv";
dotnev.config();
import cors from "cors";
import path from "path";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import indexRoute from "./routes/index.route";
import { swaggersDocuments } from "./utils/swagger";
import swaggerUI from "swagger-ui-express";

const app = express();

app.use(
  cors({
    methods: "POST,GET,DELETE,PATCH,PUT,HEAD",
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

app.use(helmet());
// app.use(mongoSanitize());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(path.resolve(), "public")));
app.use("/images", express.static("public/images"));
app.set("views", "./src/views");
app.set("view engine", "hbs");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggersDocuments));
app.use(indexRoute);
// app.use("*", (req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

export default app;
