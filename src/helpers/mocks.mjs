import config from "./config.mjs";
import { verifyToken } from "./auth.mjs";

const userDataJohn = {
  id: 7,
  name: "John Doe",
  email: "john@doe.com",
  password: "abcABC123!",
};

const userDataBob = {
  id: 12,
  name: "Bob Ross",
  email: "bob@ross.com",
  password: "?987ZYXzyx",
};

const todoData = {
  title: "Take a shower",
  description: "Take a shower at 5p.m and use the new soap",
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

const immortalJWT = // Expires after the destruction of humanity
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
  "." +
  "eyJzdWIiOjEwMCwibmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNzU4ODg4MzY2LCJleHAiOjMxNTU5MzI3MzMwNzY2fQ" +
  "." +
  "PFhiLWsL9bhi3GK-ozkr0O70YvTweXkb6LMwfCdku_Q";

const verifyTokenMiddleware = verifyToken(config.jwtSecretTest);

export default {
  userDataJohn,
  userDataBob,
  todoData,
  req,
  res,
  next,
  expiredJWT,
  immortalJWT,
  verifyTokenMiddleware,
};
