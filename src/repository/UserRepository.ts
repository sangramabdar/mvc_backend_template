import { Db } from "mongodb";
import {
  Repository,
  RepositoryImpl,
} from "../common/genericComponents/repository/repository";
import { UserEntity } from "../entity/UserEntity";

interface UserRepository<T> extends Repository<T> {}

class UserRepositoryImpl
  extends RepositoryImpl<UserEntity>
  implements UserRepository<UserEntity>
{
  static collection = "users";
  constructor() {
    super(UserRepositoryImpl.collection);
  }
}

export { UserRepository, UserRepositoryImpl };