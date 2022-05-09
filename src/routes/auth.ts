import { Router } from "express";
import AuthController from "../controllers/AuthController";
import {
  validateLoginSchema,
  validateSignUpSchema,
} from "../schema/authSchema";

const AuthRouter = Router();

AuthRouter.post("/signup", validateSignUpSchema, AuthController.signup);

AuthRouter.post("/login", validateLoginSchema, AuthController.login);

export default AuthRouter;
