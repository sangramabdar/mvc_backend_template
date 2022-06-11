import UserRouter from "../routes/user";
import { app } from "./initServer";
import { errorHandlingMiddleWare } from "../common/helper/errorMiddleWare";
import RootController from "../controllers/RootController";
import RootRouter from "../routes/root";
import AuthRouter from "../routes/auth";

async function initRoutes() {
  app.use("/", RootRouter);
  app.use("/auth", AuthRouter);
  app.use("/users", UserRouter);
  app.use("*", RootController.wrongRoute);

  //global error handling middleware
  app.use(errorHandlingMiddleWare);
}

export default initRoutes;
