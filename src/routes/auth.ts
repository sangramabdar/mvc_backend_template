import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validateAuthSchema, validateLoginSchema } from "../entity/AuthEntity";

const AuthRouter = Router();

AuthRouter.post("/signup", validateAuthSchema, AuthController.signup);

AuthRouter.post("/login", validateLoginSchema, AuthController.login);

export default AuthRouter;
