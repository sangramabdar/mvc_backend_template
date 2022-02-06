import {
  CrudRepository,
  CrudRepositoryImpl,
} from "../common/genericComponents/Repository";
import { UserEntity } from "../entity/UserEntity";

interface UserRepository extends CrudRepository<UserEntity> {}

class UserRepositoryImpl
  extends CrudRepositoryImpl<UserEntity>
  implements UserRepository
{
  static collection = "users";
  constructor() {
    super(UserRepositoryImpl.collection);
  }
}

export { UserRepository, UserRepositoryImpl };
