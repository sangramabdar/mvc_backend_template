import BookRouter from "../entity/book/book.routes";
import RootRouter from "../root/root.routes";
import RootController from "../root/root.controller";
import UserRouter from "../entity/user/user.routes";
import { app } from "./initserver";
import { errorMiddleWare } from "../helper/errorMiddleWare";

async function initRoutes() {
  app.use("/", RootRouter);
  app.use("/users", UserRouter);
  app.use("/books", BookRouter);
  app.use("*", RootController.wrongRoute);
  app.use(errorMiddleWare);
}

export default initRoutes;
