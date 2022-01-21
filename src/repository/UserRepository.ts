import {
  Repository,
  RepositoryImpl,
} from "../common/genericComponents/Repository";
import { UserEntity } from "../entity/UserEntity";

interface UserRepository extends Repository<UserEntity> {}

class UserRepositoryImpl
  extends RepositoryImpl<UserEntity>
  implements UserRepository
{
  static collection = "users";
  constructor() {
    super(UserRepositoryImpl.collection);
  }
}

export { UserRepository, UserRepositoryImpl };
