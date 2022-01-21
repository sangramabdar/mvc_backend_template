import { Controller } from "../common/genericComponents/Controller";
import { UserEntity } from "../entity/UserEntity";
import { UserService } from "../services/UserService";

class UserController extends Controller<UserEntity, UserService> {
  constructor() {
    super(new UserService());
  }
}

export { UserController };
