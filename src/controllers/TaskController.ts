import { CrudController } from "../common/genericComponents/Controller";
import { TaskEntity } from "../entity/TaskEntity";
import TaskService from "../services/TaskService";

class TaskController extends CrudController<TaskEntity, TaskService> {
  constructor() {
    super(new TaskService());
  }
}

export default TaskController;
