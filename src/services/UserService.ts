import {
  EntityService,
  EntityServiceImpl,
} from "../common/genericComponents/service/entityServive";
import { UserEntity } from "../entity/UserEntity";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../repository/UserRepository";

interface UserService extends EntityService<UserEntity> {}

class UserServiceImpl
  extends EntityServiceImpl<UserEntity, UserRepository<UserEntity>>
  implements UserService
{
  constructor() {
    super(new UserRepositoryImpl(), "user");
  }
}
export { UserService, UserServiceImpl };
