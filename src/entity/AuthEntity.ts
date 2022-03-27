import { Request, Response } from "express";
import {
  BuildSchema,
  StringSchema,
  validateSchema,
} from "../common/schemaValidation/schema";

interface AuthEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginEntity {
  email: string;
  password: string;
}

const AuthSchema = BuildSchema<AuthEntity>({
  firstName: new StringSchema().min(5).max(20).onlyAlphabets(),
  lastName: new StringSchema().min(5).max(20).onlyAlphabets(),
  email: new StringSchema().email(),
  password: new StringSchema().min(8).max(20),
});

const LoginSchema = BuildSchema<LoginEntity>({
  email: new StringSchema().email(),
  password: new StringSchema().min(8).max(20),
});

async function validateLoginSchema(req: Request, res: Response, next) {
  try {
    req.body = await validateSchema(LoginSchema, req.body, "complete");
    next();
  } catch (error) {
    next(error);
  }
}

async function validateAuthSchema(req: Request, res: Response, next) {
  try {
    req.body = await validateSchema(AuthSchema, req.body, "complete");
    next();
  } catch (error) {
    next(error);
  }
}

export {
  validateAuthSchema,
  AuthEntity,
  LoginEntity,
  AuthSchema,
  LoginSchema,
  validateLoginSchema,
};
