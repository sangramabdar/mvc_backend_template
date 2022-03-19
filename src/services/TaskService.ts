import { ObjectId } from "mongodb";

import { CrudService } from "../common/genericComponents/Service";
import {
  DataBaseConnectionError,
  EntityNotFound,
} from "../common/helper/exceptions";
import Database from "../config/db";
import { TaskEntity } from "../entity/TaskEntity";
import { Request } from "express";
import {
  TaskRepository,
  TaskRepositoryImpl,
} from "../repository/TaskRespository";

class TaskService extends CrudService<TaskEntity, TaskRepository> {
  constructor() {
    super(new TaskRepositoryImpl(), "task");
  }

  override async getAllEntities(req: Request): Promise<TaskEntity[]> {
    console.log("task");
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    let url = req.baseUrl;
    let userID = url.split("/users/")[1].split("/tasks")[0];
    let _id = new ObjectId(userID);

    let user = await db.collection("users").findOne(
      {
        _id,
      },
      {
        projection: {
          tasks: 1,
        },
      }
    );

    let tasks: TaskEntity[] = (await db
      .collection("tasks")
      .find({
        _id: { $in: user?.tasks },
      })
      .toArray()) as TaskEntity[];

    if (tasks.length == 0) {
      throw new EntityNotFound("tasks");
    }
    return tasks;
  }

  override async saveEntity(entity: TaskEntity, req: Request) {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    let task = await this.entityRepository.save(entity, db);

    let url = req.baseUrl;
    let userID = url.split("/users/")[1].split("/tasks")[0];
    let _id = new ObjectId(userID);

    await db.collection("users").updateOne(
      {
        _id,
      },
      {
        $push: { tasks: task._id },
      }
    );

    return task;
  }

  override async deleteEntity(id: string, req: Request): Promise<string> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }

    let task = await this.entityRepository.deleteById(id, db);

    if (!task) {
      throw new EntityNotFound(this.entityName);
    }

    let url = req.baseUrl;
    let userID = url.split("/users/")[1].split("/tasks")[0];
    let _id = new ObjectId(userID);

    let result = await db.collection("users").updateOne(
      {
        _id,
      },
      {
        $pull: { tasks: new ObjectId(id) },
      }
    );

    return "deleted";
  }
}

export default TaskService;
