import Express from "express";
import cors from "cors";

import initRoutes from "./initRoutes";
import Logger from "../common/helper/Logger";

const app = Express();

async function initServer() {
  app.use(Logger);
  app.use(cors());
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  await initRoutes();
}

export { initServer, app };
