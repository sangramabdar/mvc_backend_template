import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { WrongContent } from "./exceptions";

async function validateId(request: Request, response: Response, next) {
  try {
    var id = request.params["id"];
    var isValid = ObjectId.isValid(id);
    if (!isValid) {
      throw new WrongContent("id is in wrong format");
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function validateBody(request: Request, $: Response, next) {
  try {
    if (Object.keys(request.body).length == 0)
      throw new Error("body should not be empty");
    next();
  } catch (error) {
    next(error);
  }
}

export { validateId, validateBody };
