import { Request, Response } from "express";
import ResponseBodyBuilder from "../helper/responseBodyBuilder";
import { CrudRepository } from "./Repository";
import { CrudService } from "./Service";

class CrudController<E, T extends CrudService<E, CrudRepository<E>>> {
  entityService: T;

  constructor(entityService: T) {
    this.entityService = entityService;
  }

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
      const result = await this.entityService.getAllEntities(request);
      let responseBody = new ResponseBodyBuilder<E[]>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  saveEntity = async (request: Request, response: Response, next: any) => {
    try {
      const entity: E = request.body;
      const result = await this.entityService.saveEntity(entity, request);
      let responseBody = new ResponseBodyBuilder<E>("", result).setStatusCode(
        201
      );
      return response.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  updateEntity = async (request: Request, response: Response, next: any) => {
    try {
      const id = request.params["id"];
      const entity: E = request.body;
      const result = await this.entityService.updateEntity(id, entity, request);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  deleteEntity = async (request: Request, response: Response, next: any) => {
    try {
      const id = request.params["id"];
      const result = await this.entityService.deleteEntity(id, request);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };
}

export { CrudController };
