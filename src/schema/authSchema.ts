import {
  BuildSchema,
  StringSchema,
  validateSchema,
} from "../common/schemaValidation/schema";
import { Request, Response } from "express";

interface SignUpSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginSchema {
  email: string;
  password: string;
}

const signUpSchema = BuildSchema<SignUpSchema>({
  firstName: new StringSchema().min(5).max(20).onlyAlphabets(),
  lastName: new StringSchema().min(5).max(20).onlyAlphabets(),
  email: new StringSchema().email(),
  password: new StringSchema().min(8).max(20),
});

const loginSchema = BuildSchema<LoginSchema>({
  email: new StringSchema().email(),
  password: new StringSchema().min(8).max(20),
});

async function validateLoginSchema(req: Request, res: Response, next) {
  try {
    req.body = await validateSchema(loginSchema, req.body, "complete");
    next();
  } catch (error) {
    next(error);
  }
}

async function validateSignUpSchema(req: Request, res: Response, next) {
  try {
    req.body = await validateSchema(signUpSchema, req.body, "complete");
    next();
  } catch (error) {
    next(error);
  }
}

export { validateSignUpSchema, validateLoginSchema, SignUpSchema, LoginSchema };
