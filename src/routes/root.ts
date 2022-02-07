import { Router } from "express";
import { generate, validateToken } from "../common/helper/validation";
import RootController from "../controllers/RootController";

const RootRouter = Router();

RootRouter.get("/", RootController.get);
RootRouter.post("/login", RootController.loginRoute);
RootRouter.use("/access", validateToken);
RootRouter.use("/refresh", generate);

export default RootRouter;
