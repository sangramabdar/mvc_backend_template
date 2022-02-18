import { Response } from "express";
import {
  DataBaseConnectionError,
  EntityNotFound,
  WrongContent,
} from "./exceptions";
import ResponseBodyBuilder from "./responseBodyBuilder";

async function statusCodeHandler(
  error: Error,
  responseBody: ResponseBodyBuilder<string>,
  response: Response
) {
  if (error instanceof DataBaseConnectionError) {
    responseBody.setStatusCode(500);
    response.statusCode = 500;
  } else if (error instanceof EntityNotFound) {
    responseBody.setStatusCode(404);
    response.statusCode = 404;
  } else if (error instanceof WrongContent) {
    responseBody.setStatusCode(422);
    response.statusCode = 422;
  } else {
    responseBody.setStatusCode(400);
    response.statusCode = 400;
  }
}

async function errorHandlingMiddleWare(error, request, response, next) {
  let responseBody = new ResponseBodyBuilder<string>(error.message);
  await statusCodeHandler(error, responseBody, response);
  return response.json(responseBody);
}

export { errorHandlingMiddleWare, statusCodeHandler };
