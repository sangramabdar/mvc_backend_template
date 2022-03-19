import { Request } from "express";
import Database from "../../config/db";
import { DataBaseConnectionError, EntityNotFound } from "../helper/exceptions";
import { CrudRepository } from "./Repository";

class CrudService<E, T extends CrudRepository<E>> {
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

  async getAllEntities(req: Request): Promise<E[]> {
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

  async saveEntity(entity: E, req: Request) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    entity = await this.entityRepository.save(entity, db);
    return entity;
  }

  async updateEntity(id: string, entity: E, req: Request) {
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

  async deleteEntity(id: string, req: Request) {
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

export { CrudService };
