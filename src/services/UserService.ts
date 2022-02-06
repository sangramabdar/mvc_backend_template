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
    const db = await Database.getDb();

    if (db == null) {
      throw new DataBaseConnectionError();
    }
    const result = await this.entityRepository.getAll(db, {});
    if (!result) {
      throw new EntityNotFound(this.entityName);
    }
    return result;
  }

  //buisness logic for user , that is why parent method is overridden here.
  override async getEntity(id: string): Promise<UserEntity> {
    const db = await Database.getDb();

    if (db == null) {
      throw new DataBaseConnectionError();
    }
    const result = await this.entityRepository.getById(id, db);
    if (!result) {
      throw new EntityNotFound(this.entityName);
    }
    return result;
  }
}
export { UserService };
