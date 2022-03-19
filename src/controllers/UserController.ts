import { CrudController } from "../common/genericComponents/Controller";
import { UserEntity } from "../entity/UserEntity";
import { UserService } from "../services/UserService";

class UserController extends CrudController<UserEntity, UserService> {
  constructor() {
    super(new UserService());
  }
}

export { UserController };
