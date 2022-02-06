import { Router } from "express";
import RootController from "../controllers/RootController";

const RootRouter = Router();

RootRouter.get("/", RootController.get);
RootRouter.post("/login", RootController.loginRoute);
RootRouter.use("/access", RootController.accessRoute);

export default RootRouter;
