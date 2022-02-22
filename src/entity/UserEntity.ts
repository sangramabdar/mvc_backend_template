import { Request, Response } from "express";
import {
  NumberSchema,
  SchemaObject,
  StringSchema,
  validateSchema,
} from "../common/schemaValidation/schema";
import BaseEntity from "./BaseEntity";

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
  address: string;
  gender: string;
  email: string;
  password: string;
}

const UserSchema = SchemaObject<UserEntity>({
  name: new StringSchema("name").max(10).min(5).onlyAplhabates(),
  age: new NumberSchema("age").notNegative().min(18).max(100),
  gender: new StringSchema("gender").of(["male", "female"]),
  email: new StringSchema("email").email(),
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
