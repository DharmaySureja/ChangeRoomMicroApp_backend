
import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";

const { PORT, MONGODB_URL } = require("./config/config");

import ChangeroomController from "./resources/changeroom/changeroom.controller";

/**
 * Creats an application object where all the controllers are intialized and inserted into the application object.
 */

validateEnv();
const app = new App(
  [
      new ChangeroomController()
  ],
  Number(PORT),
  MONGODB_URL
);
app.listen();
