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
  override async getAllEntities(): Promise<UserEntity[]> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    const users = await this.entityRepository.getAll(db, {
      email: 1,
      _id: 1,
    });
    if (!users) {
      throw new EntityNotFound(this.entityName);
    }
    return users;
  }

  override async getEntity(id: string): Promise<UserEntity> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    const user = await this.entityRepository.getById(id, db, {
      email: 1,
      id: 1,
    });
    if (!user) {
      throw new EntityNotFound(this.entityName);
    }

    return user;
  }
}
export { UserService };
