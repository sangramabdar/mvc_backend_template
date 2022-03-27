import { Request, Response } from "express";
import {
  BuildSchema,
  StringSchema,
  validateSchema,
} from "../common/schemaValidation/schema";
import BaseEntity from "./BaseEntity";

interface TaskEntity extends BaseEntity {
  name: string;
  description: string;
}

const TasKSchema = BuildSchema<TaskEntity>({
  name: new StringSchema(),
  description: new StringSchema(),
});

async function validateTaskSchema(request: Request, response: Response, next) {
  try {
    if (request.method === "POST") {
      request.body = await validateSchema(TasKSchema, request.body, "complete");
    } else {
      request.body = await validateSchema(TasKSchema, request.body, "partial");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { TaskEntity, TasKSchema, validateTaskSchema };
