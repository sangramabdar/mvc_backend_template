import { Router } from "express";
import { generate, validateToken } from "../common/helper/validation";
import RootController from "../controllers/RootController";

const RootRouter = Router();

RootRouter.get("/", RootController.get);

export default RootRouter;
