import { Router } from "express";
import dependencies from "../config/dependencies";
import { validateId } from "../common/helper/validation";
import { validateTaskSchema } from "../schema/taskSchema";
const TaskRouter = Router();

const { taskController } = dependencies;

TaskRouter.use("/:id", validateId);

TaskRouter.get("/:id", taskController.getEntity);
TaskRouter.get("", taskController.getAllEntities);
TaskRouter.post("/", validateTaskSchema, taskController.saveEntity);
TaskRouter.put("/:id", validateTaskSchema, taskController.updateEntity);
TaskRouter.delete("/:id", taskController.deleteEntity);

export default TaskRouter;
