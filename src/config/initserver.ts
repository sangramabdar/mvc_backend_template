import Express from "express";
import cors from "cors";

import { initDependencies } from "./dependencies";
import initRoutes from "./initRoutes";

const app = Express();

async function initServer() {
  app.use(cors());
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  await initDependencies();
  await initRoutes();
}

export { initServer, app };
