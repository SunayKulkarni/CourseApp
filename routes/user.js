import { Router } from "express";
import express from "express";
import { userModel } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userMiddleware from "../middleware/user.js";

const app = express();
const userRouter = Router();
app.use(express.json());
dotenv.config();

userRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = req.body.user;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await userModel.create({
      email: email,
      password: hashedPassword,
      user: user,
    });
  } catch (e) {
    res.json({
      message: "User already exists",
    });
    return;
  }

  res.json({
    message: "You are signed up",
  });
});

userRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userData = await userModel.findOne({
    email: email,
  });

  const passMatch = bcrypt.compare(password, userData.password);

  if (passMatch) {
    const token = jwt.sign(
      {
        id: userData._id,
      },
      process.env.USER_JWT_SECRET,
    );

    res.json({
      message: "Signin successfull!",
      token: token,
    });
  }
});

userRouter.get("/purchases", userMiddleware, (req, res) => {
  res.json({
    message: "Purchases accessed",
  });
});

export default userRouter;
