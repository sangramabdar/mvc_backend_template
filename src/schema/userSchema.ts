import { Request, Response } from "express";
import {
  BuildSchema,
  StringSchema,
  validateSchema,
} from "../common/schemaValidation/schema";
import { UserEntity } from "../entity/UserEntity";

interface UserSchema extends UserEntity {}

const userSchema = BuildSchema<UserSchema>({
  firstName: new StringSchema().min(5).max(20).onlyAlphabets(),
  lastName: new StringSchema().min(5).max(20).onlyAlphabets(),
  email: new StringSchema().email(),
  password: new StringSchema().min(8).max(20),
});

async function validateUserSchema(request: Request, response: Response, next) {
  try {
    // if (request.method === "POST") {
    //   request.body = await validateSchema(UserSchema, request.body, "complete");
    // } else {
    //   request.body = await validateSchema(UserSchema, request.body, "partial");
    // }
    request.body = await validateSchema(userSchema, request.body, "partial");
    next();
  } catch (error) {
    next(error);
  }
}

export { validateUserSchema };
