import { Request, Response } from "express";
import {
  SchemaObject,
  StringSchema,
  validateSchema,
} from "../common/schemaValidation/schema";
import AuthController from "../controllers/AuthController";
import BaseEntity from "./BaseEntity";

interface AuthEntity extends BaseEntity {
  email: string;
  password: string;
}

const AuthSchema = SchemaObject<AuthEntity>({
  email: new StringSchema("email").email(),
  password: new StringSchema("password").min(8).max(20),
});

async function validateAuthSchema(req: Request, res: Response, next) {
  try {
    req.body = await validateSchema(AuthSchema, req.body, "complete");
    next();
  } catch (error) {
    next(error);
  }
}

export { validateAuthSchema, AuthEntity, AuthSchema };
