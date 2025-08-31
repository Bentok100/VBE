import jwt from "jsonwebtoken";

const genToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10y",
  });
};

export default genToken;
