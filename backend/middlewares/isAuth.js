import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "token is not found" });
    }

    const token = authHeader.split(" ")[1];
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    return res.status(500).json({ message: `is auth error ${error}` });
  }
};

export default isAuth;
