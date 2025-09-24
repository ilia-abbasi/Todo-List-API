import { verifyToken } from "./auth.mjs";

const userData = {
  id: 7,
  name: "John Doe",
  email: "john@doe.com",
};

const req = {
  headers: {},
};

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

const next = jest.fn();

const expiredJWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
  "." +
  "eyJzdWIiOjcsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBkb2UiLCJpYXQiOjE3NTg3MTQ0ODYsImV4cCI6MTc1ODcxNDQ4N30" +
  "." +
  "nh7IJP4G2Ln-oiS5H_TA-cgK6tHOiE0L8iPmkz7E-C0";

const jwtSecret = "aaaaaaaaaaaaaaaaaaa";

const verifyTokenMiddleware = verifyToken(jwtSecret);

export default {
  userData,
  req,
  res,
  next,
  expiredJWT,
  jwtSecret,
  verifyTokenMiddleware,
};
