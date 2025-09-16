import express from "express";
const app = express();

app.listen(port, () => {
  console.log(`Server: Listening on port ${port} ...`);
});
