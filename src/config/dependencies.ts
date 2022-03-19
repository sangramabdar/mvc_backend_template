import { UserController } from "../controllers/UserController";
import TaskController from "../controllers/TaskController";

type DependencyType = {
  userController: UserController;
  taskController: TaskController;
};

let dependencies: DependencyType = {
  userController: new UserController(),
  taskController: new TaskController(),
};

export default dependencies;
