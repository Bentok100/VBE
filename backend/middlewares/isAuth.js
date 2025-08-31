import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
