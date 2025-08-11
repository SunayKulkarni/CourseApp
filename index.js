import express from "express";
import jwt from "jsonwebtoken";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import adminRouter from "./routes/admin.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(express.json());
const port = process.env.PORT;

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
  mongoose.connect(process.env.MONGODB_URL);
  app.listen(port, () => {
    console.log(`Server running  at port ${port}`);
  });
}

main();
