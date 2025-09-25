import { verifyToken } from "./auth.mjs";

const userData = {
  id: 7,
  name: "John Doe",
  email: "john@doe.com",
  password: "abcABC123!",
};

const todoData = {
  title: "Test title",
  description: "Some description about the todo item.",
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
  "eyJzdWIiOjEwMCwibmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNzU4ODAzNjQxLCJleHAiOjMxNTU5MzI3MjQ2MDQxfQ" +
  "." +
  "0X6oaxymJHZ6BODMMg0Z7G-1qMAxD658F2Recubxh9s";

const jwtSecret = "aaaaaaaaaaaaaaaaaaa";

const verifyTokenMiddleware = verifyToken(jwtSecret);

export default {
  userData,
  todoData,
  req,
  res,
  next,
  expiredJWT,
  immortalJWT,
  jwtSecret,
  verifyTokenMiddleware,
};
