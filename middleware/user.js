import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, process.env.USER_JWT_SECRET);
  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Auth Error",
    });
  }
}

export default userMiddleware;
