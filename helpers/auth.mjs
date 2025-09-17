import jwt from "jsonwebtoken";

function createJWT(user_id, name, email, expiresIn = "1h") {
  if (!user_id || !name || !email) return false;

  return jwt.sign(
    {
      sub: user_id,
      name: name,
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn,
    }
  );
}

export { createJWT };
