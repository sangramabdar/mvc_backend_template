import { Request, Response } from "express";

import {
  StringSchema,
  NumberSchema,
  validateSchema,
  SchemaObject,
} from "../../common/schemaValidation/schema";

import BaseEntity from "../baseEntity";

interface UserEntity extends BaseEntity {
  name: string;
  age: number;
  address: string;
  gender: string;
  email: string;
}

const UserSchema = SchemaObject<UserEntity>({
  name: new StringSchema("name").max(10).min(5).onlyAplhabates(),
  age: new NumberSchema("age").notNegative().min(18).max(100),
  gender: new StringSchema("gender").of(["male", "female"]),
});

async function validateUserSchema(request: Request, response: Response, next) {
  try {
    if (request.method === "POST") {
      request.body = await validateSchema(UserSchema, request.body, "POST");
    } else {
      request.body = await validateSchema(UserSchema, request.body, "PUT");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { UserEntity, UserSchema, validateUserSchema };
