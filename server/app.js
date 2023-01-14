import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json()); //body parser

app.use("/api/v1/users/", userRouter);
app.use("/public", express.static("public"));

export default app;
