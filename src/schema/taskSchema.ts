import {
  BuildSchema,
  StringSchema,
  validateSchema,
} from "../common/schemaValidation/schema";
import { Request, Response } from "express";
import { TaskEntity } from "../entity/TaskEntity";

interface TaskSchema extends TaskEntity {}

const taskSchema = BuildSchema<TaskEntity>({
  name: new StringSchema(),
  description: new StringSchema(),
});

async function validateTaskSchema(request: Request, response: Response, next) {
  try {
    if (request.method === "POST") {
      request.body = await validateSchema(taskSchema, request.body, "complete");
    } else {
      request.body = await validateSchema(taskSchema, request.body, "partial");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { validateTaskSchema };
