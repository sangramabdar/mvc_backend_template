import { Router } from "express";
import RootController from "../controllers/RootController";

const RootRouter = Router();

RootRouter.get("/", RootController.get);

export default RootRouter;
