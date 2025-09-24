import "./helpers/load_env.mjs";

import { createApp } from "./app/app.mjs";
import db from "./database/db.mjs";

const app = createApp();
const port = process.env.PORT || 4000;

db.initializePool();

app.listen(port, () => {
  console.log(`Server: Listening on port ${port} ...`);
});
