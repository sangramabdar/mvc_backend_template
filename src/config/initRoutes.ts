import UserRouter from "../routes/user";
import { app } from "./initserver";
import { errorHandlingMiddleWare } from "../common/helper/errorMiddleWare";
import RootController from "../controllers/RootController";
import RootRouter from "../routes/root";

async function initRoutes() {
  app.use("/", RootRouter);
  app.use("/users", UserRouter);
  app.use("*", RootController.wrongRoute);
  app.use(errorHandlingMiddleWare);
}
