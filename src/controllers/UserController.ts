import {
  EntityController,
  EntityControllerImpl,
} from "../common/genericComponents/controller/entityController";
import { UserEntity } from "../entity/UserEntity";
import { UserService, UserServiceImpl } from "../services/UserService";

interface UserController extends EntityController<UserEntity> {}

class UserControllerImpl
  extends EntityControllerImpl<UserEntity, UserService>
  implements UserController
{
  constructor() {
    super(new UserServiceImpl());
  }
}

export { UserController, UserControllerImpl };
