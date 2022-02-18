import { CrudService } from "../common/genericComponents/Service";
import {
  DataBaseConnectionError,
  EntityNotFound,
} from "../common/helper/exceptions";
import Database from "../config/db";
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
