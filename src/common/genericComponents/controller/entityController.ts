import { Request, Response } from "express";
import { statusCodeHandler } from "../../../helper/errorMiddleWare";
import ResponseBodyBuilder from "../../helper/responseBodyBuilder";
import { EntityService } from "../service/entityServive";

interface EntityController<T> {
  getEntity(request: Request, response: Response, next: any);
  getAllEntities(request: Request, response: Response, next: any);
  addEntity(request: Request, response: Response, next: any);
  updateEntity(request: Request, response: Response, next: any);
  deleteEntity(request: Request, response: Response, next: any);
}

class EntityControllerImpl<E, T extends EntityService<E>>
  implements EntityController<E>
{
  entityService: T;

  getEntity = async (request: Request, response: Response, next: any) => {
    try {
      const id = request.params["id"];
      const result = await this.entityService.getEntity(id);
      const responseBody = new ResponseBodyBuilder<E>().setPayload(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  getAllEntities = async (request: Request, response: Response, next: any) => {
    try {
      const result = await this.entityService.getAllEntities();
      let responseBody = new ResponseBodyBuilder<E[]>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  addEntity = async (request: Request, response: Response, next: any) => {
    try {
      const user: E = request.body;
      const result = await this.entityService.addEntity(user);
      let responseBody = new ResponseBodyBuilder<string>("", result);
      return response.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  updateEntity = async (request: Request, response: Response, next: any) => {
    try {
      const id = request.params["id"];
      const user: E = request.body;
      const result = await this.entityService.updateEntity(id, user);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      let responseBody = new ResponseBodyBuilder<string>(error.message);
      statusCodeHandler(error, responseBody, response);
      return response.json(responseBody);
    }
  };

  deleteEntity = async (request: Request, response: Response, next: any) => {
    try {
      const id = request.params["id"];
      const result = await this.entityService.deleteEntity(id);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };
}

export { EntityController, EntityControllerImpl };
