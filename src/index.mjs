import "./helpers/load_env.mjs";

import config from "./helpers/config.mjs";
import { createApp } from "./app/app.mjs";
import db from "./database/db.mjs";
import { createJWT } from "./helpers/auth.mjs";

if (process.argv[2] === "test") {
  config.testMode = true;
}
console.log(createJWT(100, "test", "test@test.test", "999999y"));
const app = createApp();
const port = process.env.PORT || 4000;

db.initializePool();

app.listen(port, () => {
  console.log(`Server: Listening on port ${port} ...`);
});
