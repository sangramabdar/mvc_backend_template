import { Request, Response } from "express";
import { CrudController } from "../common/genericComponents/Controller";
import ResponseBodyBuilder from "../common/helper/responseBodyBuilder";
import { UserEntity } from "../entity/UserEntity";
import { UserService } from "../services/UserService";

class UserController extends CrudController<UserEntity, UserService> {
  constructor() {
    super(new UserService());
  }

  override getEntity = async (
    request: Request,
    response: Response,
    next: any
  ) => {
    try {
      const id = request.params["id"];
      const result = await this.entityService.getEntity(id);
      const responseBody = new ResponseBodyBuilder<UserEntity>().setPayload(
        result
      );
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };
}

export { UserController };
