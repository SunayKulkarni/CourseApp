import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  if (decodedData) {
    req.adminId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Auth Error",
    });
  }
}

export default adminMiddleware;
