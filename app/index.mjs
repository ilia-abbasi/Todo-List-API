import dotenv from "dotenv";
import express from "express";
import mainRouter from "../routes/main.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(mainRouter);

app.listen(port, () => {
  console.log(`Server: Listening on port ${port} ...`);
});
