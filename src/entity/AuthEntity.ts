import { Request, Response } from "express";
import {
  SchemaObject,
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

const AuthSchema = SchemaObject<AuthEntity>({
  firstName: new StringSchema("firstName").min(5).max(20).onlyAlphabets(),
  lastName: new StringSchema("lastName").min(5).max(20).onlyAlphabets(),
  email: new StringSchema("email").email(),
  password: new StringSchema("password").min(8).max(20),
});

const LoginSchema = SchemaObject<LoginEntity>({
  email: new StringSchema("email").email(),
  password: new StringSchema("password").min(8).max(20),
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
