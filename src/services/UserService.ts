import { CrudService } from "../common/genericComponents/Service";
import { UserEntity } from "../entity/UserEntity";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../repository/UserRepository";

class UserService extends CrudService<UserEntity, UserRepository> {
  constructor() {
    super(new UserRepositoryImpl(), "user");
  }
}
export { UserService };
