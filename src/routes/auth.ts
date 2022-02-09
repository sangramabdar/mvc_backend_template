import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validateAuthSchema } from "../entity/AuthEntity";

const AuthRouter = Router();

AuthRouter.post("/signup", validateAuthSchema, AuthController.signup);

AuthRouter.post("/login", validateAuthSchema, AuthController.login);

export default AuthRouter;
