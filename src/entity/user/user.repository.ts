import {
  Repository,
  RepositoryImpl,
} from "../../common/genericComponents/Repository/repository";
import { UserEntity } from "./user.entity";

interface UserRepository<T> extends Repository<T> {}

class UserRepositoryImpl
  extends RepositoryImpl<UserEntity>
  implements UserRepository<UserEntity>
{
  private static collection = "users";
  constructor() {
    super(UserRepositoryImpl.collection);
  }
}

export { UserRepository, UserRepositoryImpl };
