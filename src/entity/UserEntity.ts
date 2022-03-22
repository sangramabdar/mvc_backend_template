import { Request, Response } from "express";
import {
  NumberSchema,
  SchemaObject,
  StringSchema,
  validateSchema,
} from "../common/schemaValidation/schema";
import BaseEntity from "./BaseEntity";

interface UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema = SchemaObject<UserEntity>({
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
    request.body = await validateSchema(UserSchema, request.body, "partial");
    next();
  } catch (error) {
    next(error);
  }
}

export { UserEntity, UserSchema, validateUserSchema };
