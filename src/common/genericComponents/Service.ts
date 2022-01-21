import Database from "../../config/db";
import { DataBaseConnectionError, EntityNotFound } from "../helper/exceptions";
import { Repository } from "./Repository";

// interface Service<E> {
//   getEntity(id: string): Promise<E>;
//   getAllEntities(): Promise<E[]>;
//   saveEntity(entity: E): Promise<E>;
//   updateEntity(id: string, entity: E);
//   deleteEntity(id: string);
// }

class Service<E, T extends Repository<E>> {
  protected entityRepository: T;
  protected entityName: string = "";

  constructor(entityRepository: T, entityName: string) {
    this.entityRepository = entityRepository;
    this.entityName = entityName;
  }
  async getEntity(id: string): Promise<E> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    const result = await this.entityRepository.getById(id, db);
    if (!result) {
      throw new EntityNotFound(this.entityName);
    }
    return result;
  }

  async getAllEntities(): Promise<E[]> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    const users = await this.entityRepository.getAll(db);
    if (!users) {
      throw new EntityNotFound(this.entityName);
    }
    return users;
  }

  async saveEntity(entity: E) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    await this.entityRepository.save(entity, db);
    return entity;
  }

  async updateEntity(id: string, entity: E) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    let result = await this.entityRepository.updateById(id, entity, db);
    if (!result) {
      throw new EntityNotFound(this.entityName);
    }
    return "updated";
  }

  async deleteEntity(id: string) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    let result = await this.entityRepository.deleteById(id, db);
    if (!result) {
      throw new EntityNotFound(this.entityName);
    }
    return "deleted";
  }
}

export { Service };
