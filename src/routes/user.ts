import { Router } from "express";
import {
  validateAccess,
  validateId,
  validateToken,
} from "../common/helper/validation";
import dependencies from "../config/dependencies";
import { validateUserSchema } from "../entity/UserEntity";
import TaskRouter from "./task";
const UserRouter = Router();

const { userController } = dependencies;

UserRouter.use("/:id", validateId, validateToken, validateAccess);
UserRouter.get("/:id", userController.getEntity);
UserRouter.put("/:id", validateUserSchema, userController.updateEntity);
UserRouter.delete("/:id", userController.deleteEntity);
UserRouter.use("/:id/tasks", TaskRouter);

export default UserRouter;
