import {
  CrudRepository,
  CrudRepositoryImpl,
} from "../common/genericComponents/Repository";
import { TaskEntity } from "../entity/TaskEntity";
interface TaskRepository extends CrudRepository<TaskEntity> {}

class TaskRepositoryImpl
  extends CrudRepositoryImpl<TaskEntity>
  implements TaskRepository
{
  static collection: string = "tasks";
  constructor() {
    super(TaskRepositoryImpl.collection);
  }
}

export { TaskRepository, TaskRepositoryImpl };
