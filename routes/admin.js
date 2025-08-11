import { Router } from "express";
import { adminModel } from "../db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRouter = Router();
dotenv.config();

adminRouter.post("/signup", async (req, res) => {
  const { email, password, admin } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await adminModel.create({
      email: email,
      password: hashedPassword,
      admin: admin,
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "User already exists",
    });
    return;
  }

  res.json({
    message: "Signed Up!",
  });
});

adminRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const adminData = await adminModel.findOne({
    email: email,
  });

  const passMatch = bcrypt.compare(password, adminData.password);

  if (passMatch) {
    const token = jwt.sign(
      {
        id: adminData._id,
      },
      process.env.ADMIN_JWT_SECRET,
    );

    res.json({
      message: "Signin successfull!",
      token: token,
    });
  }
});

adminRouter.post("/courses", (req, res) => {});

adminRouter.put("/courses", (req, res) => {});

adminRouter.get("/courses", (req, res) => {});

export default adminRouter;
