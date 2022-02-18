import Express from "express";
import cors from "cors";

import initRoutes from "./initRoutes";
import Logger from "../common/helper/Logger";

const app = Express();

async function initServer() {
  app.use(cors());
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  app.use(Logger);
  await initRoutes();
}

export { initServer, app };
