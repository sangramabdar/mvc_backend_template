import {
  EntityController,
  EntityControllerImpl,
} from "../../common/genericComponents/controller/entityController";

import { UserEntity } from "./user.entity";

import { UserService, UserServiceImpl } from "./user.service";

interface UserController extends EntityController<UserEntity> {}

class UserControllerImpl
  extends EntityControllerImpl<UserEntity, UserService>
  implements UserController
{
  static userController: UserController = new UserControllerImpl();
  constructor() {
    super();
    this.entityService = new UserServiceImpl();
  }
}

export { UserController, UserControllerImpl };
