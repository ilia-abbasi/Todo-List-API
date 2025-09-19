import jwt from "jsonwebtoken";
import { makeResponseObj } from "./response.mjs";

function createJWT(userId, name, email, expiresIn = "1h") {
  if (!userId || !name || !email) return false;

  return jwt.sign(
    {
      sub: userId,
      name: name,
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn,
    }
  );
}

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (!token) {
    const resObj = makeResponseObj(false, "Unauthorized");

    return res.status(401).json(resObj);
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    const resObj = makeResponseObj(false, "Invalid or expired token");

    return res.status(401).json(resObj);
  }
}

export { createJWT, verifyToken };
